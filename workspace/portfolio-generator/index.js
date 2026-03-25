const fs = require('fs');
const path = require('path');

const portfolioFilePath = path.join(__dirname, 'portfolio.json');
const templateFilePath = path.join(__dirname, 'templates/default.html');
const outputDir = path.join(__dirname, 'output');

// Read the portfolio configuration
const portfolioData = JSON.parse(fs.readFileSync(portfolioFilePath, 'utf8'));

// Read the template
const templateContent = fs.readFileSync(templateFilePath, 'utf8');

// Replace placeholders with portfolio data
const outputContent = templateContent.replace(/{{(.*?)}}/g, (match, key) => {
  return portfolioData[key] || '';
});

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Write the output file
fs.writeFileSync(path.join(outputDir, 'index.html'), outputContent);

console.log('Portfolio generated successfully!');