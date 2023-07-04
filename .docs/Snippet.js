"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMarkdown = exports.make = void 0;
const make = (title, body, description, prefix) => {
    return {
        title,
        body,
        description,
        prefix
    };
};
exports.make = make;
const toMarkdown = (snippet) => `### ${snippet.title}
- Description: ${snippet.description}
- Prefix: ${snippet.prefix}
- Body:
\`\`\`
${Array.isArray(snippet.body) ? snippet.body.join('\n') : snippet.body}
\`\`\`
`;
exports.toMarkdown = toMarkdown;
