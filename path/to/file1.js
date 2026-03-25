const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => {
    if (b === 0) {
        return 'Error: Division by zero';
    }
    return a / b;
};

// Export the functions for use in other files
module.exports = { add, subtract, multiply, divide };