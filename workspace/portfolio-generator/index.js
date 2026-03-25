const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const portfolioJsonPath = path.join(__dirname, 'portfolio.json');
const templatePath = path.join(__dirname, 'templates/default.html');
const outputPath = path.join(__dirname, 'output');

// Read portfolio.json
const portfolioData = JSON.parse(fs.readFileSync(portfolioJsonPath, 'utf8'));

// Render template
const templateHtml = fs.readFileSync(templatePath, 'utf8');
const renderedHtml = ejs.render(templateHtml, portfolioData);

// Create output directory if it doesn't exist
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

// Write rendered HTML to output/index.html
fs.writeFileSync(path.join(outputPath, 'index.html'), renderedHtml);
