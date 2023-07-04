import { pipe, S, F } from '@mobily/ts-belt'
import * as fs from 'fs'
import * as ChunkSnippet from './chunkSnippet'
import * as Readme from './readmeFormat'
import path from 'path'

const removeComments = (str: string): string =>
  pipe(
    str,
    S.replaceByRe(/\/\/.*/g, ''),
    S.replaceByRe(/\/\*[\s\S]*?\*\//g, '')
  )

const snippetFilePath = path.join(
  process.cwd(),
  'snippets',
  'typescriptreactsnippets.code-snippets'
)

const readmePath = path.join(process.cwd(), 'README2.md')
const fileContent = fs.readFileSync(snippetFilePath, 'utf8')

pipe(
  fileContent,
  removeComments,
  ChunkSnippet.fromJson,
  Readme.fromChunkSnippet,
  Readme.toMarkdown,
  F.tap((data) => fs.writeFileSync(readmePath, data))
)
