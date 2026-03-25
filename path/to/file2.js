// file2.js
// 计算器应用的入口文件

const calculate = require('./file1.js');

function startCalculator() {
    console.log('Enter operation (+, -, *, /):');
    const operation = prompt('Enter operation (+, -, *, /):');

    console.log('Enter first number:');
    const num1 = parseFloat(prompt('Enter first number:'));

    console.log('Enter second number:');
    const num2 = parseFloat(prompt('Enter second number:'));

    try {
        const result = calculate(operation, num1, num2);
        console.log(`Result: ${result}`);
    } catch (error) {
        console.error(error.message);
    }
}

startCalculator();