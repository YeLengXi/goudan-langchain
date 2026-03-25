const assert = require('assert');

module.exports = {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  truthy: value => !!value,
  falsy: value => !value,
  throws: async (fn, expected) => {
    try {
      await fn();
      return false;
    } catch (error) {
      return error.message === expected;
    }
  },
  contains: (array, item) => array.includes(item)
};
