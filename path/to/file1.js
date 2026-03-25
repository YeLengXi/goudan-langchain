// file1.js
// A simple calculator that can perform addition and subtraction

function calculate(operation, num1, num2) {
  if (operation === 'add') {
    return num1 + num2;
  } else if (operation === 'subtract') {
    return num1 - num2;
  }
}

// Test cases
console.log(calculate('add', 5, 3)); // Should output 8
console.log(calculate('subtract', 5, 3)); // Should output 2;