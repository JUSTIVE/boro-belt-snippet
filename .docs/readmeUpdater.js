const fs = require('fs');
const path = require('path');

const snippetToMarkdown = (title, snippet) => `
### ${title}
- Description: ${snippet.description}
- Prefix: ${snippet.prefix}
- Body:
\`\`\`
${Array.isArray(snippet.body) ? snippet.body.join('\n') : snippet.body}
\`\`\`
`;

const snippetsToMarkdown = (snippets) => 
    Object.entries(snippets)
        .map(([title, snippet]) => snippetToMarkdown(title, snippet))
        .join('\n');

const removeComments = (str) => {
  const singleLineComments = /\/\/.*/g;
  const multiLineComments = /\/\*[\s\S]*?\*\//g;
  return str.replace(singleLineComments, '').replace(multiLineComments, '');
}

const snippetFilePath = path.join(process.cwd(), 'snippets', 'typescriptreactsnippets.code-snippets');

fs.readFile(snippetFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Failed to read file: ${err}`);
        return;
    }
    
    try {
        const noCommentData = removeComments(data);
        const snippets = JSON.parse(noCommentData);
        const markdownString = snippetsToMarkdown(snippets);
        const readmePath = path.join(process.cwd(), 'README.md');

        fs.readFile(readmePath, 'utf8', (err, readmeData) => {
            if (err) {
                console.error(`Failed to read README.md: ${err}`);
                return;
            }

            const featuresStartIndex = readmeData.indexOf('## Features');
            const featuresEndIndex = readmeData.indexOf('\n## ', featuresStartIndex);

            const preFeatures = readmeData.slice(0, featuresStartIndex);
            const postFeatures = featuresEndIndex !== -1 ? readmeData.slice(featuresEndIndex) : '';

            const newReadmeData = `${preFeatures}## Features\n${markdownString}\n${postFeatures}`;

            fs.writeFile(readmePath, newReadmeData, (err) => {
                if (err) {
                    console.error(`Failed to write README.md: ${err}`);
                } else {
                    console.log('Successfully updated README.md');
                }
            });
        });
    } catch (err) {
        console.error(`Failed to parse file: ${err}`);
    }
});
