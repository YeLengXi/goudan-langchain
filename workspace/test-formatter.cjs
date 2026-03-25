#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const formatterPath = path.join(__dirname, 'code-formatter-v3.cjs');
const formatter = require(formatterPath);

const testCode = `function add(a, b) {
  return a + b;
}

const obj = {
  method: function() {
    console.log('Hello, world!');
  }
};

obj.method();
`;

const config = {
  formatArrowFunctions: true,
  formatObjects: true,
  indentSize: 2
};

const formattedCode = formatter.formatCode(testCode, config);

console.log(formattedCode);