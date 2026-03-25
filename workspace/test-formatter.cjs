#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { formatCode } = require('./code-formatter-v3.cjs');

const testFile = path.join(__dirname, 'test-input.js');
const outputTestFile = path.join(__dirname, 'test-output.js');

const testCode = fs.readFileSync(testFile, 'utf8');
const formattedCode = formatCode(testCode, { indentSize: 2 });

fs.writeFileSync(outputTestFile, formattedCode, 'utf8');
