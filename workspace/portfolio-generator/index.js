const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const express = require('express');
const app = express();
const port = 3000;

const templatePath = path.join(__dirname, 'templates', 'default.html');
const outputPath = path.join(__dirname, 'output');

fs.mkdirSync(outputPath, { recursive: true });

app.get('/', (req, res) => {
  const portfolio = JSON.parse(fs.readFileSync('portfolio.json', 'utf8'));
  const html = ejs.render(fs.readFileSync(templatePath, 'utf8'), portfolio);
  fs.writeFileSync(path.join(outputPath, 'index.html'), html);
  res.send('Website generated successfully!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});