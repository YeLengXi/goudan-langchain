const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const portfolioFilePath = path.join(__dirname, 'portfolio.json');
const templateFilePath = path.join(__dirname, 'templates/default.html');
const outputDirectory = path.join(__dirname, 'output');

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

const portfolioData = JSON.parse(fs.readFileSync(portfolioFilePath, 'utf8'));
const template = fs.readFileSync(templateFilePath, 'utf8');
const outputHtml = ejs.render(template, portfolioData);

fs.writeFileSync(path.join(outputDirectory, 'index.html'), outputHtml);
