const { describe, it, expect } = require('./test.js');

module.exports = {
  describe,
  it,
  before: (name, fn) => {
    beforeHooks.push({ name, fn });
  },
  after: (name, fn) => {
    afterHooks.push({ name, fn });
  },
  run: (testPath) => {
    const tests = require(testPath);
    testsdescribe();
  }
};