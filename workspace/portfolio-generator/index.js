// This is the main program of the portfolio generator.
// It reads the portfolio configuration, generates the website, and serves it locally.

const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const app = express();

// Read the portfolio configuration
const portfolioConfig = JSON.parse(fs.readFileSync('portfolio.json', 'utf8'));

// Generate the HTML content
const generateHTML = (portfolioConfig) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${portfolioConfig.name}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: ${portfolioConfig.theme_color || '#ffffff'};
    }
  </style>
</head>
<body>
  <h1>${portfolioConfig.name}</h1>
  <h2>${portfolioConfig.position}</h2>
  <p>${portfolioConfig.bio}</p>
  <h3>Skills</h3>
  <ul>
    ${portfolioConfig.skills.map(skill => `<li>${skill}</li>`).join('')}
  </ul>
  <h3>Projects</h3>
  <ul>
    ${portfolioConfig.projects.map(project => `<li>${project.name}: ${project.description}</li>`).join('')}
  </ul>
  <h3>Social Links</h3>
  <ul>
    ${Object.entries(portfolioConfig.social_links).map(([key, value]) => `<li><a href="${value}">${key.toUpperCase()}</a></li>`).join('')}
  </ul>
</body>
</html>`;
}

// Serve the generated HTML
app.get('/', (req, res) => {
  res.send(generateHTML(portfolioConfig));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});