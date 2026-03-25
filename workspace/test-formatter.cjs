/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { formatCode } = require('./code-formatter-v3.cjs');

const testFile = 'test.js';
const expectedFile = 'expected.js';

const testCode = `function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

const obj = {
  greet: function() {
    return 'Hello, world!';
  }
};

const arr = [1, 2, 3];
`;

const expectedCode = `const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const obj = {
  greet: () => 'Hello, world!' // Object method arrow function conversion
};

const arr = [1, 2, 3];
`;

fs.writeFileSync(testFile, testCode, 'utf8');
fs.writeFileSync(expectedFile, expectedCode, 'utf8');

const testResult = formatCode(fs.readFileSync(testFile, 'utf8'), {
  formatArrowFunctions: true,
  formatObjects: true
});
const expectedResult = fs.readFileSync(expectedFile, 'utf8');

console.log('Test passed:', testResult === expectedResult);