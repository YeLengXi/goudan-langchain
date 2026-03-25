// This is the main program of the portfolio generator.
// It reads the portfolio configuration, generates the HTML and CSS,
// and serves the generated website.

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const portfolio = JSON.parse(fs.readFileSync('portfolio.json', 'utf8'));
  const template = fs.readFileSync('templates/default.html', 'utf8');
  const html = template.replace(/{{(.*?)}}/g, (match, key) => {
    return portfolio[key] || '';
  });
  res.send(html);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});