#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const codeFormatterPath = path.join(__dirname, 'code-formatter-v3.cjs');
const testFilePath = path.join(__dirname, 'test.js');
const outputFilePath = path.join(__dirname, 'formatted-test.js');

const { formatCode } = require(codeFormatterPath);

const testCode = fs.readFileSync(testFilePath, 'utf8');
const formattedCode = formatCode(testCode, {
  indentSize: 2,
  formatArrowFunctions: true,
  formatObjects: true,
  formatArrays: true
});
fs.writeFileSync(outputFilePath, formattedCode, 'utf8');
console.log('Test completed. Formatted code saved to formatted-test.js');