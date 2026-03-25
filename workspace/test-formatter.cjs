const fs = require('fs');
const path = require('path');

const formatterPath = path.join(__dirname, '../code-formatter-v3.cjs');
const testFile = path.join(__dirname, 'test.js');
const formattedFile = path.join(__dirname, 'formatted-test.js');

console.log('Running test...');
fs.readFile(testFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading test file:', err);
    return;
  }

  const { formatCode } = require(formatterPath);
  const formatted = formatCode(data);

  fs.writeFile(formattedFile, formatted, 'utf8', (err) => {
    if (err) {
      console.error('Error writing formatted file:', err);
      return;
    }

    console.log('Test passed! Formatted file created:', formattedFile);
  });
});
