const codeFormatter = require('./code-formatter-v3.cjs');

// Test case 1: Format arrow functions
const code1 = 'function add(a, b) { return a + b; }';
console.log('Test Case 1 - Before formatting:');
console.log(code1);
console.log('');
console.log('Test Case 1 - After formatting:');
console.log(codeFormatter.formatCode(code1, { formatArrowFunctions: true }));

// Test case 2: Format object methods
const code2 = '{
  name: "name",
  getName: function() { return this.name; }
}';
console.log('');
console.log('Test Case 2 - Before formatting:');
console.log(code2);
console.log('');
console.log('Test Case 2 - After formatting:');
console.log(codeFormatter.formatCode(code2, { formatObjects: true }));

// Test case 3: Format configuration options
const code3 = 'const config = {
  indentSize: 4,
  maxLineLength: 100
};';
console.log('');
console.log('Test Case 3 - Before formatting:');
console.log(code3);
console.log('');
console.log('Test Case 3 - After formatting:');
console.log(codeFormatter.formatCode(code3, { indentSize: 4, maxLineLength: 100 }));
