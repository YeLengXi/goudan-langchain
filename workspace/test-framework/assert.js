const assert = require('assert');

module.exports = {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  truthy: value => assert.ok(value, 'Expected value to be truthy'),
  falsy: value => assert.ok(!value, 'Expected value to be falsy'),
  throws: (fn, error) => {
    try {
      fn();
      assert.fail('Expected function to throw an error');
    } catch (err) {
      assert.strictEqual(err, error, 'Expected thrown error to match');
    }
  },
  contains: (array, item) => {
    assert.ok(array.includes(item), 'Expected array to contain item');
  }
};