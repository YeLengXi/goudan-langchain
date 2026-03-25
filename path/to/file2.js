// file2.js
// 计算器用户界面

const { add, subtract, multiply, divide } = require('./file1.js');

function displayResult(operation, a, b) {
    console.log(`Result of ${operation} ${a} and ${b}: ${eval(operation)(a, b)}`);
}

function startCalculator() {
    const operation = prompt('Enter operation (add, subtract, multiply, divide): ', '').toLowerCase();
    const a = parseFloat(prompt('Enter first number: ', ''));
    const b = parseFloat(prompt('Enter second number: ', ''));

    if (operation === 'add') {
        displayResult(operation, a, b);
    } else if (operation === 'subtract') {
        displayResult(operation, a, b);
    } else if (operation === 'multiply') {
        displayResult(operation, a, b);
    } else if (operation === 'divide') {
        displayResult(operation, a, b);
    } else {
        console.log('Invalid operation');
    }
}

startCalculator();