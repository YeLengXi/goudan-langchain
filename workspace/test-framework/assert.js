const assert = require('assert');

module.exports = {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  truthy: value => assert.ok(value, 'Expected value to be truthy'),
  falsy: value => assert.ok(!value, 'Expected value to be falsy'),
  throws: (fn, expected) => {
    try {
      fn();
      assert.fail('Expected function to throw');
    } catch (error) {
      assert.strictEqual(error, expected, 'Expected thrown value to be instance of');
    }
  },
  contains: (array, item) => {
    assert.ok(array.includes(item), 'Expected array to contain item');
  }
};