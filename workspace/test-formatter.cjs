const codeFormatter = require('./code-formatter-v3.cjs');

const inputCode = `function add(a, b) {
  return a + b;
}

const obj = {
  method: function() {
    return 'Hello, World!';
  }
};

const formattedCode = codeFormatter.formatCode(inputCode);
console.log(formattedCode);