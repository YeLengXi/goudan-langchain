const codeFormatter = require('./code-formatter-v3.cjs');

// Test file for code-formatter-v3.cjs

const testCode = `function add(a, b) {
  return a + b;
}

const obj = {
  sayHello: function() {
    console.log('Hello!');
  },
  arrowAdd: (a, b) => a + b
};

module.exports = { add, obj };`;

// Format the test code
const formattedCode = codeFormatter.formatCode(testCode, { indentSize: 2 });

// Output the formatted code to the console
console.log(formattedCode);