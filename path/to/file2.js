const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) {
    return 'Invalid operation';
  }
  return a / b;
};

const calculate = (num1, num2, operation) => {
  if (operation === 'multiply') {
    return multiply(num1, num2);
  } else if (operation === 'divide') {
    return divide(num1, num2);
  }
  return 'Invalid operation';
};

module.exports = calculate;