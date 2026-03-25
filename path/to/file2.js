// file2.js - A module that uses the calculator from file1.js

const calculate = require('./file1.js');

function performCalculations() {
  console.log(calculate(10, 5, '+')); // 15
  console.log(calculate(10, 5, '-')); // 5
  console.log(calculate(10, 5, '*')); // 50
  console.log(calculate(10, 5, '/')); // 2
}

// Export the performCalculations function for use in other files
module.exports = performCalculations;