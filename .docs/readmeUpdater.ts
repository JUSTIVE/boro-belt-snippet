import * as ChunkSnippet from './chunkSnippet.ts';
import * as Readme from './readmeFormat.ts';
import * as fs from 'fs';

import { F, S, flow, pipe } from '@mobily/ts-belt';

import path from 'path';

const removeComments = flow(
  S.replaceByRe(/\/\/.*/g, ''),
  S.replaceByRe(/\/\*[\s\S]*?\*\//g, '')
);

const snippetFilePath = path.join(
  process.cwd(),
  'snippets',
  'typescriptreactsnippets.code-snippets'
);

const readmePath = path.join(process.cwd(), 'README.md');
const fileContent = fs.readFileSync(snippetFilePath, 'utf8');

pipe(
  fileContent,
  removeComments,
  ChunkSnippet.fromJson,
  Readme.fromChunkSnippet,
  Readme.toMarkdown,
  F.tap((data: string) => fs.writeFileSync(readmePath, data))
);
