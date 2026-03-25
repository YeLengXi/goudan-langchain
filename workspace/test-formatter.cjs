const codeFormatter = require('./code-formatter-v3.cjs');

const code = `function add(a, b) {
  return a + b;
}

const obj = {
  name: 'John',
  age: 30
};

const array = [1, 2, 3];
`

const formattedCode = codeFormatter.formatCode(code);
console.log(formattedCode);