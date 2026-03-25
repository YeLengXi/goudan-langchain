const fs = require('fs');
const path = require('path');

// Read the portfolio configuration file
const portfolioConfigPath = path.join(__dirname, 'portfolio.json');
const portfolioConfig = JSON.parse(fs.readFileSync(portfolioConfigPath, 'utf8'));

// Read the template file
const templatePath = path.join(__dirname, 'templates/default.html');
const templateContent = fs.readFileSync(templatePath, 'utf8');

// Replace template placeholders with portfolio information
const generatedHtml = templateContent.replace(/{{(.*?)}}/g, (match, key) => {
  if (key in portfolioConfig) {
    return portfolioConfig[key];
  }
  return match;
});

// Write the generated HTML to the output file
const outputHtmlPath = path.join(__dirname, 'output/index.html');
fs.writeFileSync(outputHtmlPath, generatedHtml, 'utf8');

console.log('Website generated successfully!');