const fs = require('fs');
const path = require('path');
const { runTests } = require('./index.js');

const watchDirectory = directory => {
  fs.watch(directory, (event, filename) => {
    if (event === 'change' && filename.endsWith('.test.js')) {
      console.log(`File changed: ${filename}, running tests...`);
      runTests(directory);
    }
  });
};

module.exports = { watchDirectory };