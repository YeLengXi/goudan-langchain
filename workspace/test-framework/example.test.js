const { describe, it, expect } = require('./test-framework/test.js');

const { equal, deepEqual, truthy, falsy, throws, contains } = require('./test-framework/assert.js');

describe('Array operations', () => {
  it('should include item', () => {
    expect([1, 2, 3].includes(2)).toBe(true);
  });
});