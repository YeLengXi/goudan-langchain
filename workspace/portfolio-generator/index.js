const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const portfolioPath = path.join(__dirname, 'portfolio.json');
const templatePath = path.join(__dirname, 'templates/default.html');
const outputPath = path.join(__dirname, 'output');

const portfolio = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'));

const renderTemplate = (data) => {
  return ejs.render(fs.readFileSync(templatePath, 'utf8'), data);
};

const generateWebsite = () => {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }

  const htmlContent = renderTemplate(portfolio);
  fs.writeFileSync(path.join(outputPath, 'index.html'), htmlContent);
  fs.writeFileSync(path.join(outputPath, 'style.css'), renderTemplate({}));
};

module.exports = generateWebsite;