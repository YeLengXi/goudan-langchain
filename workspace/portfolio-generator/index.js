const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const PORTFOLIO_FILE = 'portfolio.json';
const TEMPLATE_FILE = 'templates/default.html';
const OUTPUT_DIR = 'output';

const portfolioData = JSON.parse(fs.readFileSync(PORTFOLIO_FILE, 'utf8'));

const renderTemplate = (data) => {
  const template = fs.readFileSync(TEMPLATE_FILE, 'utf8');
  return ejs.render(template, data);
};

const generateWebsite = () => {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  const htmlContent = renderTemplate(portfolioData);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), htmlContent);
};

module.exports = {
  generateWebsite
};