const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

const calculate = (num1, num2, operation) => {
  if (operation === 'add') {
    return add(num1, num2);
  } else if (operation === 'subtract') {
    return subtract(num1, num2);
  }
  return 'Invalid operation';
};

module.exports = calculate;