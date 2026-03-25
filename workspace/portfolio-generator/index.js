const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const portfolioFilePath = path.join(__dirname, 'portfolio.json');
const templateFilePath = path.join(__dirname, 'templates/default.html');
const outputDir = path.join(__dirname, 'output');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const portfolioData = JSON.parse(fs.readFileSync(portfolioFilePath, 'utf8'));
const template = fs.readFileSync(templateFilePath, 'utf8');
const outputFilePath = path.join(outputDir, 'index.html');

const html = ejs.render(template, portfolioData);
fs.writeFileSync(outputFilePath, html);
console.log('Portfolio website generated successfully!');