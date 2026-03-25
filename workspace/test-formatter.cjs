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
    // Add space after = in arrow function: (a,b)=\(\)\=> => (a,b) =>
    formatted = formatted.replace(/(\w)=\((.*?)\)=>/g, '$1 = ($2) =>');
  }

  // Step 2: Add newlines after semicolons
  formatted = formatted.replace(/;/g, ';\n');

  // Step 3: Add newlines after opening braces
  formatted = formatted.replace(/{/g, '{\n');

  // Step 4: Add newlines before closing braces
  formatted = formatted.replace(/}/g, '\n}\n');

  // Step 5: Add newlines after keywords
  formatted = formatted.replace(/\b(function|if|for|while|else)\b/g, '\n$1');

  // Clean up multiple newlines
  formatted = formatted.replace(/\n{3,}/g, '\n\n');

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
  const config = { ...DEFAULT_CONFIG }; // Add support for custom indentation
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

  return { config, files }; // Add support for custom indentation
}

// ... (rest of the code remains unchanged) ...