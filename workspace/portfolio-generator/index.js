// This is the main program of the portfolio generator.
// It reads the portfolio configuration, generates the website, and serves it locally.

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

const portfolioConfigPath = path.join(__dirname, 'portfolio.json');
const templatePath = path.join(__dirname, 'templates/default.html');

// Read the portfolio configuration
const portfolioConfig = JSON.parse(fs.readFileSync(portfolioConfigPath, 'utf8'));

// Generate the website
const generateWebsite = () => {
  const html = fs.readFileSync(templatePath, 'utf8').replace(/{{(.*?)}}/g, (match, key) => {
    return portfolioConfig[key] || '';
  });
  fs.writeFileSync(path.join(__dirname, 'output'), html);
};

// Serve the website locally
app.use(express.static(path.join(__dirname, 'output')));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  generateWebsite();
});