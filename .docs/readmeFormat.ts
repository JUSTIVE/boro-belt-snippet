import * as ChunkSnippet from './chunkSnippet'
import { pipe } from '@mobily/ts-belt'

export type t = {
  title: string
  description: string
  // contents: string
  body: string
  license: string
}

export const fromChunkSnippet = (chunkSnippet: ChunkSnippet.t) => ({
  title: 'boro-belt',
  description: "Market Boro's vscode snippet for ts-belt and ts-pattern.",
  // contents: chunkSnippet.toContentMarkdown(),
  body: pipe(chunkSnippet, ChunkSnippet.toMarkdown),
  license: ''
})

export const toMarkdown = (readme: t) =>
  `# ${readme.title}\n${readme.description}\n\n${readme.body}\n${readme.license}`
