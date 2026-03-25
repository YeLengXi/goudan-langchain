// This is the main program of the portfolio generator.
// It reads the portfolio configuration, generates the HTML and CSS files, and starts a local server for preview.

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

const portfolioConfig = require('./portfolio.json');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/default.html'), { root: __dirname });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});