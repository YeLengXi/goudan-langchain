const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const PORT = 3000;
const OUTPUT_DIR = './output';
const TEMPLATE_PATH = './templates/default.html';
const CONFIG_PATH = './portfolio.json';

function generatePortfolio() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

  const output = ejs.render(template, config);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), output);
}

function startServer() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  generatePortfolio();

  require('http').createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync(path.join(OUTPUT_DIR, 'index.html'), 'utf8'));
  }).listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();