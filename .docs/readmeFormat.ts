import * as ChunkSnippet from './chunkSnippet.ts';

import { flow } from '@mobily/ts-belt';

export type t = {
  title: string;
  description: string;
  // contents: string
  body: string;
  license: string;
};

export const fromChunkSnippet = flow<ChunkSnippet.t[], string, t>(
  ChunkSnippet.toMarkdown,
  (body) => ({
    title: 'boro-belt',
    description: "Market Boro's vscode snippet for ts-belt and ts-pattern.",
    body,
    license: '',
  })
);

export const toMarkdown = (readme: t) =>
  `# ${readme.title}\n${readme.description}\n\n${readme.body}\n${readme.license}`;
