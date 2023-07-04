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
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMarkdown = exports.fromChunkSnippet = void 0;
const ChunkSnippet = __importStar(require("./chunkSnippet"));
const ts_belt_1 = require("@mobily/ts-belt");
const fromChunkSnippet = (chunkSnippet) => ({
    title: 'boro-belt',
    description: "Market Boro's vscode snippet for ts-belt and ts-pattern.",
    // contents: chunkSnippet.toContentMarkdown(),
    body: (0, ts_belt_1.pipe)(chunkSnippet, ChunkSnippet.toMarkdown),
    license: ''
});
exports.fromChunkSnippet = fromChunkSnippet;
const toMarkdown = (readme) => `# ${readme.title}\n${readme.description}\n\n${readme.body}\n${readme.license}`;
exports.toMarkdown = toMarkdown;
