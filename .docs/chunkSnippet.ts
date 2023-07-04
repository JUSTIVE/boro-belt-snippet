import * as Snippet from './Snippet'
import { match, P } from 'ts-pattern'
import { pipe, D, O, A, S } from '@mobily/ts-belt'

export type t = Record<string, Snippet.t[]>

type entryValue = {
  body: string
  description: string
  prefix: string
}
type jsonEntry = readonly [string, entryValue]
const jsonEntryPattern = [
  P.string,
  {
    body: P.string,
    description: P.string,
    prefix: P.string
  }
] as const

export const fromJson = (jsonString: string): t => {
  const groupByModule =
    (state: t) =>
    (rest: readonly jsonEntry[]): t => {
      const accumulate = (state: t, cur: jsonEntry) => {
        const [title_, body] = cur
        const title = pipe(
          title_,
          S.split('.'),
          A.head,
          O.getWithDefault<string>('others')
        )
        const snippet: Snippet.t = {
          title: title,
          body: body.body,
          description: body.description,
          prefix: body.prefix
        }
        const currentValue = pipe(
          state,
          D.get(title),
          O.getWithDefault<Array<Snippet.t>>([])
        )

        return pipe(state, D.set(title, [...currentValue, snippet]))
      }
      console.log(state)

      return match<readonly jsonEntry[], t>(rest)
        .with([jsonEntryPattern], ([item]) => {
          return groupByModule(accumulate(state, item))([])
        })
        .with(
          [jsonEntryPattern, ...P.array(jsonEntryPattern)],
          ([head, ...tail]: readonly [jsonEntry, ...jsonEntry[]]) => {
            return groupByModule(accumulate(state, head))(tail)
          }
        )
        .otherwise(() => state)
    }
  console.log(jsonString)
  return pipe(
    JSON.parse(jsonString) as Record<string, entryValue>,
    D.toPairs,
    groupByModule({})
  )
}

export const toContentMarkdown = (snippets: t): string => {
  return pipe(
    snippets,
    D.toPairs,
    A.map(([title, snippets]) => {
      return `## ${title}\n${pipe(
        snippets,
        A.map(Snippet.toMarkdown),
        A.join('\n\n')
      )}`
    }),
    A.join('\n\n')
  )
}

export const toMarkdown = (snippets: t): string => {
  return pipe(
    snippets,
    D.toPairs,
    A.map(([title, snippets]) => {
      return `## ${title}\n${pipe(
        snippets,
        A.map(Snippet.toMarkdown),
        A.join('\n\n')
      )}`
    }),
    A.join('\n\n')
  )
}
