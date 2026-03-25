const fs = require('fs');
const path = require('path');
const { describe, it, before, after } = require('./test.js');
const { equal, deepEqual, truthy, falsy, throws, contains } = require('./assert.js');

const testsDirectory = path.join(__dirname, 'tests');
const testFiles = fs.readdirSync(testsDirectory);
const tests = [];

testFiles.forEach(file => {
  if (file.endsWith('.test.js')) {
    const testModule = require(path.join(testsDirectory, file));
    const testCases = testModule.default || testModule;
    tests.push(...Object.values(testCases));
  }
});

const runTests = () => {
  tests.forEach(testCase => {
    before(testCase.before); 
    testCase.test();
    after(testCase.after);
  });
  console.log(`
${tests.length} tests passed (${tests.filter(test => test.failed).length} failures)`);
};

module.exports = {
  runTests,
  watch
};