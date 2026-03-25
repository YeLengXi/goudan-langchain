const assert = require('assert');

module.exports = {
  equal: (actual, expected) => {
    assert.strictEqual(actual, expected);
  },

  deepEqual: (actual, expected) => {
    assert.deepStrictEqual(actual, expected);
  },

  truthy: (value) => {
    assert.ok(value);
  },

  falsy: (value) => {
    assert.ok(!value);
  },

  throws: (fn, error) => {
    try {
      fn();
    } catch (e) {
      assert.strictEqual(e, error);
    }
  },

  contains: (actual, expected) => {
    assert.ok(actual.includes(expected));
  }
};