// This is the main program of the portfolio generator.
// It reads the portfolio configuration, generates the HTML and CSS,
// and starts a local server for previewing the generated website.

const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const marked = require('marked');
const ejs = require('ejs');

const portfolioConfigPath = './portfolio.json';
const templatePath = './templates/default.html';
const outputPath = './output';

// Read the portfolio configuration
const portfolioConfig = JSON.parse(fs.readFileSync(portfolioConfigPath, 'utf8'));

// Load the HTML template
const template = fs.readFileSync(templatePath, 'utf8');

// Generate the HTML and CSS
const generateHtml = (data) => {
  return ejs.render(template, data);
}

// Write the generated HTML and CSS to the output directory
const writeOutput = (html) => {
  fs.writeFileSync(path.join(outputPath, 'index.html'), html);
}

// Start the local server for previewing
const startServer = () => {
  const app = express();
  app.use(express.static(outputPath));
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}

// Main function
const main = () => {
  const html = generateHtml(portfolioConfig);
  writeOutput(html);
  startServer();
}

main();