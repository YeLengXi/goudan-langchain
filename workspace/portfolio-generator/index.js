// This is the main program of the portfolio generator.
// It reads the portfolio configuration, generates the website, and serves it locally.

const fs = require('fs');
const path = require('path');

const portfolioConfigPath = path.join(__dirname, 'portfolio.json');
const templatePath = path.join(__dirname, 'templates/default.html');
const outputPath = path.join(__dirname, 'output');

const portfolioConfig = JSON.parse(fs.readFileSync(portfolioConfigPath, 'utf8'));

const generateWebsite = () => {
  const templateContent = fs.readFileSync(templatePath, 'utf8');
  const websiteContent = templateContent.replace(/{{name}}/g, portfolioConfig.name)
    .replace(/{{position}}/g, portfolioConfig.position)
    .replace(/{{bio}}/g, portfolioConfig.bio)
    .replace(/{{skills}}/g, portfolioConfig.skills.join(', '))
    .replace(/{{projects}}/g, generateProjectsHTML(portfolioConfig.projects));

  fs.writeFileSync(path.join(outputPath, 'index.html'), websiteContent);
};

const generateProjectsHTML = (projects) => {
  return projects.map(project => `  <div class="project">
    <h3>${project.name}</h3>
    <p>${project.description}</p>
  </div>`).join('
');
};

const serveLocally = () => {
  const http = require('http');
  const express = require('express');
  const app = express();
  const port = 3000;

  app.use(express.static(outputPath));
  http.createServer(app).listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
};

if (require.main === module) {
  generateWebsite();
  serveLocally();
}