const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const PORT = 3000;
const DIST_DIR = 'dist';
const TEMPLATE_FILE = 'templates/default.html';
const OUTPUT_FILE = 'index.html';
const PORTFOLIO_FILE = 'portfolio.json';

const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const portfolio = JSON.parse(fs.readFileSync(PORTFOLIO_FILE, 'utf-8'));
  res.render(TEMPLATE_FILE, portfolio);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  exec_command(`start http://localhost:${PORT}`);
});