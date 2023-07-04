"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_belt_1 = require("@mobily/ts-belt");
const fs = __importStar(require("fs"));
const ChunkSnippet = __importStar(require("./chunkSnippet"));
const Readme = __importStar(require("./readmeFormat"));
const path_1 = __importDefault(require("path"));
const removeComments = (str) => (0, ts_belt_1.pipe)(str, ts_belt_1.S.replaceByRe(/\/\/.*/g, ''), ts_belt_1.S.replaceByRe(/\/\*[\s\S]*?\*\//g, ''));
const snippetFilePath = path_1.default.join(process.cwd(), 'snippets', 'typescriptreactsnippets.code-snippets');
const readmePath = path_1.default.join(process.cwd(), 'README2.md');
const fileContent = fs.readFileSync(snippetFilePath, 'utf8');
(0, ts_belt_1.pipe)(fileContent, removeComments, ChunkSnippet.fromJson, Readme.fromChunkSnippet, Readme.toMarkdown, ts_belt_1.F.tap((data) => fs.writeFileSync(readmePath, data)));
