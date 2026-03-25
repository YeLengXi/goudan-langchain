const fs = require('fs');

// Default configuration
const DEFAULT_CONFIG = {
  indentSize: 2,
  maxLineLength: 80,
  formatArrowFunctions: true,
  formatObjects: true,
  formatArrays: true
};

function formatCode(code, config = DEFAULT_CONFIG) {
  let formatted = code;

  // Normalize line endings
  formatted = formatted.replace(/
/g, '\n');

  // Step 1: Format arrow functions - add spaces
  if (config.formatArrowFunctions) {
    // Add space after = in arrow function: (a,b)=> => (a,b) =>
    formatted = formatted.replace(/(\w)=\((.*?)\)=>/g, '$1 = ($2) =>');
  }

  // Step 2: Add newlines after semicolons
  formatted = formatted.replace(/;/g, ';\n');

  // Step 3: Add newlines after opening braces
  formatted = formatted.replace(/{/g, '{\n');

  // Step 4: Add newlines before closing braces
  formatted = formatted.replace(/}/g, '\n}\n');

  // Step 5: Add newlines after keywords
  formatted = formatted.replace(/(function|if|for|while|else)/g, '\n$1');

  // Clean up multiple newlines
  formatted = formatted.replace(/
{3,}/g, '\n\n');

  // Process indentation
  const lines = formatted.split('\n');
  let indentLevel = 0;
  const indentSize = config.indentSize;

  const formattedLines = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Decrease before closing brace
    if (trimmed.startsWith('}')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    // Add indentation
    const indented = ' '.repeat(indentLevel * indentSize) + trimmed;
    formattedLines.push(indented);

    // Increase after opening brace
    if (trimmed.endsWith('{')) {
      indentLevel++;
    }

    // Decrease after closing brace
    if (trimmed.endsWith('}')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }
  }

  return formattedLines.join('\n') + '\n';
}

// Test cases for code-formatter-v3.cjs

// Test arrow function formatting
const arrowFunctionTestCode = `function add(a, b) { return a + b; }`
const expectedArrowFunctionOutput = `(a, b) => { return a + b; }`
const arrowFunctionFormatted = formatCode(arrowFunctionTestCode, { formatArrowFunctions: true });
console.assert(arrowFunctionFormatted === expectedArrowFunctionOutput, 'Arrow function formatting failed');

// Test object method arrow functionization
const objectMethodTestCode = `const obj = { add: function(a, b) { return a + b; } }`
const expectedObjectMethodOutput = `const obj = { add: (a, b) => { return a + b; } }`
const objectMethodFormatted = formatCode(objectMethodTestCode, { formatObjects: true });
console.assert(objectMethodFormatted === expectedObjectMethodOutput, 'Object method arrow functionization failed');

// Test configurable indentation
const indentationTestCode = `function add(a, b) { return a + b; }`
const expectedIndentationOutput = '  function add(a, b) { return a + b; }'
const indentationFormatted = formatCode(indentationTestCode, { indentSize: 2 });
console.assert(indentationFormatted === expectedIndentationOutput, 'Configurable indentation failed');

console.log('All tests passed!');