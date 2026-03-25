const fs = require('fs');
const path = require('path');
const { describe, it, before, after } = require('./test.js');
const { equal, deepEqual, truthy, falsy, throws, contains } = require('./assert.js');
const assert = require('assert');

const testFiles = (directory) => {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      testFiles(filePath);
    } else if (filePath.endsWith('.test.js')) {
      require(filePath);
    }
  });
};

const runTests = () => {
  before(() => {}); // before all tests
  testFiles('tests');
  after(() => {}); // after all tests
  console.log('Tests completed.');
};

const watchTests = () => {
  fs.watch('tests', (event, filename) => {
    if (event === 'change' && filename.endsWith('.test.js')) {
      console.log(`File ${filename} changed, running tests...`);
      runTests();
    }
  });
};

module.exports = {
  runTests,
  watchTests
};