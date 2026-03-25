const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const portfolioFilePath = path.join(__dirname, 'portfolio.json');
const templateFilePath = path.join(__dirname, 'templates/default.html');
const outputDir = path.join(__dirname, 'output');

fs.mkdirSync(outputDir, { recursive: true });

const portfolioData = JSON.parse(fs.readFileSync(portfolioFilePath, 'utf-8'));
const template = fs.readFileSync(templateFilePath, 'utf-8');
const outputHtml = ejs.render(template, portfolioData);

fs.writeFileSync(path.join(outputDir, 'index.html'), outputHtml);