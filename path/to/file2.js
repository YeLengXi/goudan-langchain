// file2.js
// 用户界面逻辑

function displayResult(operation, a, b, result) {
    console.log(`${operation} ${a} ${b} = ${result}`);
}

function handleUserInput() {
    const operation = prompt('Enter operation (add, subtract, multiply, divide):');
    const a = parseFloat(prompt('Enter first number:'));
    const b = parseFloat(prompt('Enter second number:'));

    let result;
    switch (operation) {
        case 'add':
            result = require('./file1').add(a, b);
            break;
        case 'subtract':
            result = require('./file1').subtract(a, b);
            break;
        case 'multiply':
            result = require('./file1').multiply(a, b);
            break;
        case 'divide':
            result = require('./file1').divide(a, b);
            break;
        default:
            console.log('Invalid operation');
            return;
    }

    displayResult(operation, a, b, result);
}

handleUserInput();
