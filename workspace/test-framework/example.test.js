const { describe, it, expect } = require('./test-framework/test.js');

const { equal, deepEqual, truthy, falsy, throws, contains } = require('./test-framework/assert.js');

describe('Example tests', () => {
  it('should test equality', () => {
    equal(1, 1, '1 should be equal to 1');
  });

  it('should test deep equality', () => {
    deepEqual({ a: 1 }, { a: 1 }, 'Objects should be deeply equal');
  });

  it('should test truthiness', () => {
    truthy(true, 'True should be truthy');
  });

  it('should test falsiness', () => {
    falsy(false, 'False should be falsy');
  });

  it('should test throws', () => {
    throws(() => { throw new Error('Test error'); }, Error, 'Function should throw an Error');
  });

  it('should test contains', () => {
    contains([1, 2, 3], 2, 'Array should contain 2');
  });
});