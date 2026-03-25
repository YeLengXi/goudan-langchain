const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

const portfolioData = require('./portfolio.json');

app.get('/', (req, res) => {
  res.render('default', portfolioData);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});