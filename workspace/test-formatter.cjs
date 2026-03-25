#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { formatCode } = require('./code-formatter-v3.cjs');

const testFile = 'test.js';
const expectedFile = 'expected.js';

function runTests() {
  const testCode = fs.readFileSync(testFile, 'utf8');
  const expectedCode = fs.readFileSync(expectedFile, 'utf8');

  const formattedCode = formatCode(testCode, {
    indentSize: 2
  });

  if (formattedCode === expectedCode) {
    console.log(`✓ Test passed for ${testFile}`);
  } else {
    console.error(`✕ Test failed for ${testFile}`);
    console.log('Expected code:
', expectedCode);
    console.log('Received code:
', formattedCode);
  }
}

runTests();
