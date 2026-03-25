const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('dist'));

const template = fs.readFileSync(path.join(__dirname, 'templates', 'default.html'), 'utf-8');

app.get('/', (req, res) => {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'portfolio.json'), 'utf-8'));
  const filledTemplate = template.replace(/{{(.*?)}}/g, (match, key) => {
    return config[key] || match;
  });
  res.send(filledTemplate);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});