const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const portfolioFilePath = path.join(__dirname, 'portfolio.json');
const templateFilePath = path.join(__dirname, 'templates/default.html');
const outputFilePath = path.join(__dirname, 'output/index.html');

const portfolio = JSON.parse(fs.readFileSync(portfolioFilePath, 'utf-8'));
const template = fs.readFileSync(templateFilePath, 'utf-8');

const html = ejs.render(template, portfolio);
fs.writeFileSync(outputFilePath, html, 'utf-8');