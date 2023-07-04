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
exports.toMarkdown = exports.toContentMarkdown = exports.fromJson = void 0;
const Snippet = __importStar(require("./Snippet"));
const ts_pattern_1 = require("ts-pattern");
const ts_belt_1 = require("@mobily/ts-belt");
const jsonEntryPattern = [
    ts_pattern_1.P.string,
    {
        body: ts_pattern_1.P.string,
        description: ts_pattern_1.P.string,
        prefix: ts_pattern_1.P.string
    }
];
const fromJson = (jsonString) => {
    const groupByModule = (state) => (rest) => {
        const accumulate = (state, cur) => {
            const [title_, body] = cur;
            const title = (0, ts_belt_1.pipe)(title_, ts_belt_1.S.split('.'), ts_belt_1.A.head, ts_belt_1.O.getWithDefault('others'));
            const snippet = {
                title: title,
                body: body.body,
                description: body.description,
                prefix: body.prefix
            };
            const currentValue = (0, ts_belt_1.pipe)(state, ts_belt_1.D.get(title), ts_belt_1.O.getWithDefault([]));
            return (0, ts_belt_1.pipe)(state, ts_belt_1.D.set(title, [...currentValue, snippet]));
        };
        console.log(state);
        return (0, ts_pattern_1.match)(rest)
            .with([jsonEntryPattern], ([item]) => {
            return groupByModule(accumulate(state, item))([]);
        })
            .with([jsonEntryPattern, ...ts_pattern_1.P.array(jsonEntryPattern)], ([head, ...tail]) => {
            return groupByModule(accumulate(state, head))(tail);
        })
            .otherwise(() => state);
    };
    console.log(jsonString);
    return (0, ts_belt_1.pipe)(JSON.parse(jsonString), ts_belt_1.D.toPairs, groupByModule({}));
};
exports.fromJson = fromJson;
const toContentMarkdown = (snippets) => {
    return (0, ts_belt_1.pipe)(snippets, ts_belt_1.D.toPairs, ts_belt_1.A.map(([title, snippets]) => {
        return `## ${title}\n${(0, ts_belt_1.pipe)(snippets, ts_belt_1.A.map(Snippet.toMarkdown), ts_belt_1.A.join('\n\n'))}`;
    }), ts_belt_1.A.join('\n\n'));
};
exports.toContentMarkdown = toContentMarkdown;
const toMarkdown = (snippets) => {
    return (0, ts_belt_1.pipe)(snippets, ts_belt_1.D.toPairs, ts_belt_1.A.map(([title, snippets]) => {
        return `## ${title}\n${(0, ts_belt_1.pipe)(snippets, ts_belt_1.A.map(Snippet.toMarkdown), ts_belt_1.A.join('\n\n'))}`;
    }), ts_belt_1.A.join('\n\n'));
};
exports.toMarkdown = toMarkdown;
