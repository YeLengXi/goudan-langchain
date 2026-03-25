// file2.js
// 用户界面逻辑
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getNumber(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (input) => {
            resolve(Number(input));
        });
    });
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Error: Division by zero';
    }
    return a / b;
}

function performOperation(operation, a, b) {
    if (operation === 'add') {
        return add(a, b);
    } else if (operation === 'subtract') {
        return subtract(a, b);
    } else if (operation === 'multiply') {
        return multiply(a, b);
    } else if (operation === 'divide') {
        return divide(a, b);
    }
}

function main() {
    getNumber('Enter the first number: ').then((a) => {
        getNumber('Enter the second number: ').then((b) => {
            rl.question('Choose an operation (add, subtract, multiply, divide): ', (operation) => {
                performOperation(operation, a, b).then((result) => {
                    console.log(`Result: ${result}`);
                    rl.close();
                }).catch((error) => {
                    console.log(error);
                    rl.close();
                });
            });
        });
    });
}

main();
