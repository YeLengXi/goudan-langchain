// file2.js
// 用户界面逻辑

function showResult(operation, a, b) {
    console.log(`Result of ${operation} ${a} and ${b}: ${calculateResult(operation, a, b)}`);
}

function calculateResult(operation, a, b) {
    switch (operation) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
        default:
            return 'Invalid operation';
    }
}

module.exports = {
    showResult
}