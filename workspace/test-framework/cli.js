const fs = require('fs');
const path = require('path');
const { describe, it, before, after } = require('./test.js');
const { equal, deepEqual, truthy, falsy, throws, contains } = require('./assert.js');

const testFiles = (testDir, options) => {
  const files = fs.readdirSync(testDir);
  files.forEach(file => {
    const filePath = path.join(testDir, file);
    if (fs.statSync(filePath).isDirectory()) {
      testFiles(filePath, options);
    } else if (file.endsWith('.test.js')) {
      require(filePath)(options);
    }
  });
};

const runTests = options => {
  const testDir = options.testDir || 'tests';
  before(() => {
    // Setup code
  });

  testFiles(testDir, options);

  after(() => {
    // Teardown code
  });
};

module.exports = { runTests };