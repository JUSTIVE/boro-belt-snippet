import * as Snippet from './Snippet.ts';

import { A, D, N, O, S, flow, pipe } from '@mobily/ts-belt';

import { match } from 'ts-pattern';

export type t = Record<string, Snippet.t[]>;

type entryValue = {
  body: string;
  description: string;
  prefix: string;
};

type jsonEntry = readonly [string, entryValue];

export const fromJson = (jsonString: string): t => {
  const groupByModule =
    (state: t) =>
    (rest: readonly jsonEntry[]): t => {
      const accumulate = (state: t, cur: jsonEntry) => {
        const [title_, body] = cur;
        const title = pipe(
          title_,
          S.split('.'),
          A.head,
          O.getWithDefault<string>('others')
        );
        const snippet: Snippet.t = {
          title: title,
          body: body.body,
          description: body.description,
          prefix: body.prefix,
        };
        const currentValue = pipe(
          state,
          D.get(title),
          O.getWithDefault<Array<Snippet.t>>([])
        );

        return pipe(state, D.set(title, [...currentValue, snippet]));
      };

      return match<readonly jsonEntry[], t>(rest)
        .when(
          (rest) => rest.length === 1,
          ([item]) =>
            pipe(
              item,
              O.fromNullable,
              O.map((item) => groupByModule(accumulate(state, item))([])),
              O.getWithDefault(state)
            )
        )
        .when(
          flow(A.length, N.gt(1)),
          ([head, ...tail]: readonly [jsonEntry, ...jsonEntry[]]) =>
            groupByModule(accumulate(state, head))(tail)
        )
        .otherwise(() => state);
    };

  return pipe(
    JSON.parse(jsonString) as Record<string, entryValue>,
    D.toPairs,
    groupByModule({})
  );
};

export const toContentMarkdown = (snippets: t): string => {
  return pipe(
    snippets,
    D.toPairs,
    A.map(([title, snippets]) => {
      return `## ${title}\n${pipe(
        snippets,
        A.map(Snippet.toMarkdown),
        A.join('\n\n')
      )}`;
    }),
    A.join('\n\n')
  );
};

export const toMarkdown = (snippets: t): string => {
  return pipe(
    snippets,
    D.toPairs,
    A.map(([_, snippets]) => {
      return `${pipe(snippets, A.map(Snippet.toMarkdown), A.join('\n\n'))}`;
    }),
    A.join('\n\n')
  );
};
