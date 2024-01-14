export type t = {
  title: string;
  body: string;
  description: string;
  prefix: string;
};

export const make = (
  title: string,
  body: string,
  description: string,
  prefix: string
) => {
  return {
    title,
    body,
    description,
    prefix,
  };
};

export const toMarkdown = (snippet: t): string =>
  `### ${snippet.title}
- Description: ${snippet.description}
- Prefix: ${snippet.prefix}
- Body:
\`\`\`
${Array.isArray(snippet.body) ? snippet.body.join('\n') : snippet.body}
\`\`\`
`;
