const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const portfolioPath = path.join(__dirname, 'portfolio.json');
const templatePath = path.join(__dirname, 'templates/default.html');
const outputPath = path.join(__dirname, 'output');

const portfolio = JSON.parse(fs.readFileSync(portfolioPath, 'utf-8'));

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

const html = ejs.render(fs.readFileSync(templatePath, 'utf-8'), portfolio);

fs.writeFileSync(path.join(outputPath, 'index.html'), html);
