// This is the main program of the portfolio generator.
// It reads the portfolio configuration, generates the website, and serves it locally.

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  const portfolio = JSON.parse(fs.readFileSync('portfolio.json', 'utf-8'));
  const template = fs.readFileSync('templates/default.html', 'utf-8').replace(/{{(.*?)}}/g, (match, key) => {
    return portfolio[key] || '';
  });
  res.send(template);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});