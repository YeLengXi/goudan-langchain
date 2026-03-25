const fs = require('fs');
const path = require('path');
const { describe, it, expect } = require('./test-framework/test.js');
const { equal, deepEqual, truthy, falsy, throws, contains } = require('./assert.js');

const testFiles = fs.readdirSync('./tests').filter(file => file.endsWith('.test.js'));

const runTests = () => {
  testFiles.forEach(file => {
    const testCases = require(file);
    Object.keys(testCases).forEach(suite => {
      describe(suite, () => {
        Object.keys(testCases[suite]).forEach(test => {
          it(test, () => {
            if (testCases[suite][test].before) {
              before(testCases[suite][test].before);
            }
            if (testCases[suite][test].test) {
              testCases[suite][test].test();
            }
            if (testCases[suite][test].after) {
              after(testCases[suite][test].after);
            }
          });
        });
      });
    });
  });
};

const watchTests = () => {
  fs.watch('./tests', (event, filename) => {
    if (event === 'change' && filename.endsWith('.test.js')) {
      console.log('Test file changed. Running tests...');
      runTests();
    }
  });
};

const verbose = process.argv.includes('--verbose');
const watch = process.argv.includes('--watch');

if (watch) {
  watchTests();
} else {
  runTests();
}