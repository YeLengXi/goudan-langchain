// file2.js

// A module that uses the calculate function from file1.js

const calculate = require('./file1.js');

function performCalculations() {
  console.log('5 + 3 =', calculate('add', 5, 3));
  console.log('10 - 4 =', calculate('subtract', 10, 4));
}

// Export the performCalculations function for use in other files
module.exports = performCalculations;