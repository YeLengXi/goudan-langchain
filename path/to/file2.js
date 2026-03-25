// file2.js
// 用户界面逻辑

const { add, subtract, multiply, divide } = require('./file1.js');

function displayResult(operation, a, b) {
    console.log(`Result of ${operation} ${a} and ${b}: ${eval(operation)(a, b)}`);
}

function handleUserInput() {
    const operation = prompt('Enter an operation (add, subtract, multiply, divide):').toLowerCase();
    const a = parseFloat(prompt('Enter the first number:'));
    const b = parseFloat(prompt('Enter the second number:'));

    try {
        displayResult(operation, a, b);
    } catch (error) {
        console.error(error);
    }
}

handleUserInput();