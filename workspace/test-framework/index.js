const fs = require('fs');
const path = require('path');
const { describe, it, before, after } = require('./test.js');
const { equal, deepEqual, truthy, falsy, throws, contains } = require('./assert.js');

const testFiles = fs.readdirSync('tests').filter(file => file.endsWith('.test.js'));
const tests = [];

testFiles.forEach(file => {
  const testSpecs = require(path.join('tests', file));
  tests.push(...Object.values(testSpecs));
});

const runTests = () => {
  tests.forEach(testSpec => {
    describe(testSpec.name, () => {
      before(() => {
        if (testSpec.before) {
          testSpec.before();
        }
      });

      it(testSpec.test, () => {
        if (testSpec.async) {
          testSpec.test();
        } else {
          try {
            testSpec.test();
          } catch (error) {
            throw new Error(`Test failed: ${testSpec.test}
              Error: ${error.message}`);
          }
        }
      });

      after(() => {
        if (testSpec.after) {
          testSpec.after();
        }
      });
    });
  });
};

module.exports = {
  runTests,
  watchTests
};