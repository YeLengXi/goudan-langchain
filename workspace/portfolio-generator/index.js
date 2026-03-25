const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const portfolioPath = path.join(__dirname, 'portfolio.json');
const templatePath = path.join(__dirname, 'templates/default.html');
const outputPath = path.join(__dirname, 'output');

const generatePortfolio = () => {
    const portfolioData = fs.readFileSync(portfolioPath, 'utf8');
    const portfolio = JSON.parse(portfolioData);

    const template = fs.readFileSync(templatePath, 'utf8');
    const html = ejs.render(template, portfolio);

    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    }

    fs.writeFileSync(path.join(outputPath, 'index.html'), html);
    console.log('Portfolio generated successfully!');
};

module.exports = generatePortfolio;