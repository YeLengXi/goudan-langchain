// file1.js
// Simple calculator that can perform addition, subtraction, multiplication, and division.
function calculate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 === 0) {
                throw new Error('Division by zero is not allowed.');
            }
            return num1 / num2;
        default:
            throw new Error('Invalid operator.');
    }
}

function printResult(result) {
    console.log(result);
}
