const fs = require('fs');

const codeFormatter = require('./code-formatter-v3.cjs');

const inputCode = `function add(a, b) {
  return a + b;
}

const obj = {
  name: 'John',
  age: 30,
  sayHello: function() {
    console.log('Hello!');
  }
};

const formattedCode = codeFormatter.formatCode(inputCode, {
  formatArrowFunctions: true,
  formatObjects: true
});

fs.writeFileSync('formatted-code.js', formattedCode, 'utf8');
