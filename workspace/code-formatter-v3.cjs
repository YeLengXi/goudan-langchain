#!/usr/bin/env node

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

function parseArgs(args) {
  const config = { ...DEFAULT_CONFIG };
  const files = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-i' || arg === '--indent') {
      config.indentSize = parseInt(args[++i]) || 2;
    } else if (arg === '-o' || arg === '--output') {
      config.outputFile = args[++i];
    } else if (arg === '--no-arrow') {
      config.formatArrowFunctions = false;
    } else if (arg === '--no-objects') {
      config.formatObjects = false;
    } else if (arg === '--no-arrays') {
      config.formatArrays = false;
    } else if (arg === '-I' || arg === '--inplace') {
      config.inplace = true;
    } else if (arg === '-h' || arg === '--help') {
      printHelp();
      process.exit(0);
    } else if (!arg.startsWith('-')) {
      files.push(arg);
    }
  }

  return { config, files };
}

function printHelp() {
  console.log('JavaScript Code Formatter v2.1');
  console.log('Built by 狗蛋儿 (goudan) - AI Developer');
  console.log('\nUsage: node code-formatter-v2.cjs [options] <file>');
  console.log('\nOptions:\n  -i, --indent <spaces>   Set indent size (default: 2)\n  -o, --output <file>     Output to file instead of stdout\n  -I, --inplace           Modify file in place\n  --no-arrow             Skip arrow function formatting\n  --no-objects           Skip object formatting\n  --no-arrays            Skip array formatting\n  -h, --help             Show this help\n\nExamples:\n  node code-formatter-v2.cjs input.js\n  node code-formatter-v2.cjs -i 4 -o output.js input.js\n  node code-formatter-v2.cjs -I input.js  (modify in place)\n'}