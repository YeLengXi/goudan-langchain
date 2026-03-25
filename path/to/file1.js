// file1.js
// 计算器的核心逻辑

function calculate(operation, num1, num2) {
    switch (operation) {
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
            throw new Error('Invalid operation.');
    }
}

module.exports = calculate;