// file1.js

// A simple calculator that can perform addition and subtraction

function calculate(operation, num1, num2) {
  if (operation === 'add') {
    return num1 + num2;
  } else if (operation === 'subtract') {
    return num1 - num2;
  }
}

// Export the calculate function for use in other files
module.exports = calculate;