const { describe, it, expect } = require('./test.js');

function createTestFramework() {
  let tests = [];
  let currentTest = {
    name: '',
    tests: [],
    before: () => {},
    after: () => {}
  };

  return {
    describe: (name, fn) => {
      currentTest = {
        name: name,
        tests: [],
        before: () => {},
        after: () => {}
      };
      fn(currentTest);
      tests.push(currentTest);
    },

    it: (name, fn) => {
      currentTest.tests.push({ name, fn });
    },

    before: (fn) => {
      currentTest.before = fn;
    },

    after: (fn) => {
      currentTest.after = fn;
    },

    run: () => {
      tests.forEach(test => {
        console.log(`Running test suite: ${test.name}`);
        test.before();
        test.tests.forEach(testCase => {
          try {
            testCase.fn();
            console.log(`  ${testCase.name} ✓`);
          } catch (error) {
            console.error(`  ${testCase.name} ✗`, error);
          }
        });
        test.after();
      });
    }
  };
}

module.exports = createTestFramework();