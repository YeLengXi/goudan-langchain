const fs = require('fs');
const path = require('path');

const portfolioFilePath = path.join(__dirname, 'portfolio.json');
const templateFilePath = path.join(__dirname, 'templates/default.html');
const outputDir = path.join(__dirname, 'output');

// Read portfolio information
const portfolioData = JSON.parse(fs.readFileSync(portfolioFilePath, 'utf-8'));

// Function to replace placeholders in the template with actual data
const renderTemplate = (template, data) => {
  return template.replace(/{{(.*?)}}/g, (match, key) => {
    return data[key] || match;
  });
}

// Generate website
const generateWebsite = () => {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // Read the template file
  const templateContent = fs.readFileSync(templateFilePath, 'utf-8');

  // Render the template with portfolio data
  const renderedContent = renderTemplate(templateContent, portfolioData);

  // Write the rendered content to HTML files
  fs.writeFileSync(path.join(outputDir, 'index.html'), renderedContent);
}

// Export the generateWebsite function
module.exports = generateWebsite;