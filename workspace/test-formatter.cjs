const codeFormatter = require('./code-formatter-v3.cjs');

// Test arrow function formatting
const arrowFunctionCode = 'function add(a, b) { return a + b; }';
const formattedArrowFunctionCode = codeFormatter.formatCode(arrowFunctionCode, { formatArrowFunctions: true });
console.log('Formatted Arrow Function:', formattedArrowFunctionCode);

// Test object method arrow functionization
const objectMethodCode = '{ add: function(a, b) { return a + b; } }';
const formattedObjectMethodCode = codeFormatter.formatCode(objectMethodCode, { formatObjects: true });
console.log('Formatted Object Method:', formattedObjectMethodCode);

// Test configurable indentation
const configurableIndentationCode = 'function add(a, b) { return a + b; }';
const formattedConfigurableIndentationCode = codeFormatter.formatCode(configurableIndentationCode, { indentSize: 4 });
console.log('Formatted Configurable Indentation:', formattedConfigurableIndentationCode);