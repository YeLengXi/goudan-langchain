const fs = require('fs');

const portfolioJsonPath = 'portfolio.json';
const templatePath = 'templates/default.html';
const outputPath = 'output.html';

const portfolio = JSON.parse(fs.readFileSync(portfolioJsonPath, 'utf-8'));

const template = fs.readFileSync(templatePath, 'utf-8').replace(/{{(.*?)}}/g, (match, key) => {
  return portfolio[key] ? portfolio[key] : '';
});

fs.writeFileSync(outputPath, template);

console.log('Website generated at:', outputPath);