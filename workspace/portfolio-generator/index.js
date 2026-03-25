const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const portfolioConfigPath = path.join(__dirname, 'portfolio.json');
const templatePath = path.join(__dirname, 'templates/default.html');
const outputPath = path.join(__dirname, 'output');

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

const portfolioConfig = JSON.parse(fs.readFileSync(portfolioConfigPath, 'utf8'));

const template = fs.readFileSync(templatePath, 'utf8');
const renderedHtml = ejs.render(template, portfolioConfig);

fs.writeFileSync(path.join(outputPath, 'index.html'), renderedHtml);

console.log('Website generated successfully!');