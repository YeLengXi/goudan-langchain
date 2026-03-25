const fs = require('fs');

// Test file for code-formatter-v3.cjs

function testFormatter() {
  const code = `function add(a, b) {
    return a + b;
  }

  const formatted = formatCode(code, { indentSize: 2 });

  console.log('Original code:');
  console.log(code);

  console.log('Formatted code:');
  console.log(formatted);
}

testFormatter();