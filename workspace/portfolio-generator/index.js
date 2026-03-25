const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const portfolioJsonPath = path.join(__dirname, 'portfolio.json');
const templatePath = path.join(__dirname, 'templates/default.html');
const outputPath = path.join(__dirname, 'output');

const generatePortfolioSite = () => {
  const portfolioData = JSON.parse(fs.readFileSync(portfolioJsonPath, 'utf-8'));
  const template = fs.readFileSync(templatePath, 'utf-8');
  const renderedTemplate = ejs.render(template, portfolioData);

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }

  fs.writeFileSync(path.join(outputPath, 'index.html'), renderedTemplate);
};

module.exports = generatePortfolioSite;