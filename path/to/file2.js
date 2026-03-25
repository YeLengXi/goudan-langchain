// file2.js
// 用户界面逻辑

function displayResult(operation, a, b, result) {
    console.log(`${operation} ${a} ${b} = ${result}`);
}

function handleOperation(operation, a, b) {
    switch (operation) {
        case 'add':
            displayResult(operation, a, b, calculate.add(a, b));
            break;
        case 'subtract':
            displayResult(operation, a, b, calculate.subtract(a, b));
            break;
        case 'multiply':
            displayResult(operation, a, b, calculate.multiply(a, b));
            break;
        case 'divide':
            displayResult(operation, a, b, calculate.divide(a, b));
            break;
        default:
            console.log('Error: Invalid operation');
    }
}

module.exports = {
    handleOperation
}