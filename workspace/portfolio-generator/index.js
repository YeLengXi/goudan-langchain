const fs = require('fs');
const path = require('path');

const portfolioFilePath = path.join(__dirname, 'portfolio.json');
const templateFilePath = path.join(__dirname, 'templates/default.html');
const outputDir = path.join(__dirname, 'output');

fs.mkdirSync(outputDir, { recursive: true });

function generateWebsite() {
    const portfolio = JSON.parse(fs.readFileSync(portfolioFilePath, 'utf-8'));
    const template = fs.readFileSync(templateFilePath, 'utf-8');

    const outputHtml = template.replace('{{name}}', portfolio.name).replace('{{position}}', portfolio.position).replace('{{bio}}', portfolio.bio).replace(/{{#each skills}}/g, '').replace(/{{/each}}/g, '').replace(/{{#each projects}}/g, '').replace(/{{/each}}/g, '').replace(/{{#each social_links}}/g, '').replace(/{{/each}}/g, '');

    fs.writeFileSync(path.join(outputDir, 'index.html'), outputHtml);
}

generateWebsite();