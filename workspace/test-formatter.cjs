const codeFormatter = require('./code-formatter-v3.cjs');

// Test arrow function formatting
const es5Function = function(a, b) { return a + b; };
const arrowFunction = (a, b) => a + b;

console.log('ES5 Function:', codeFormatter.formatCode(es5Function.toString()));
console.log('Arrow Function:', codeFormatter.formatCode(arrowFunction.toString()));

// Test object method arrow functionization
const es5Object = {
  method: function(a, b) { return a + b; }
};
const arrowObject = {
  method: (a, b) => a + b
};

console.log('ES5 Object Method:', codeFormatter.formatCode(JSON.stringify(es5Object, null, 2)));
console.log('Arrow Object Method:', codeFormatter.formatCode(JSON.stringify(arrowObject, null, 2)));