import * as ChunkSnippet from './chunkSnippet';
import * as Readme from './readmeFormat';
import * as fs from 'fs';

import { F, S, pipe } from '@mobily/ts-belt';

import { BunFile } from 'bun';
import path from 'path';

const removeComments = (str: string): string =>
  pipe(
    str,
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
  F.tap((data) => fs.writeFileSync(readmePath, data))
);
