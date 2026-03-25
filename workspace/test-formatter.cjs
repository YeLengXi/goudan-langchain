const codeFormatter = require('./code-formatter-v3.cjs');

const testCode = `function add(a, b) {
  return a + b;
}

const obj = {
  greet: function() {
    return 'Hello, World!';
  }
};

console.log(codeFormatter.formatCode(testCode));
console.log(codeFormatter.formatCode(JSON.stringify(obj), { formatArrowFunctions: false, formatObjects: false }));
