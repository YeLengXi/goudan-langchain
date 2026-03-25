const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const portfolio = JSON.parse(fs.readFileSync(path.join(__dirname, 'portfolio.json')));
    const template = fs.readFileSync(path.join(__dirname, 'templates/default.html'), 'utf-8');
    const filledTemplate = template.replace(/{{(.*?)}}/g, (match, key) => {
        return portfolio[key] ? portfolio[key] : '';
    });
    res.send(filledTemplate);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});