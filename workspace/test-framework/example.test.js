const { describe, it, expect } = require('./test.js');

const { equal, deepEqual, truthy, falsy, throws, contains } = require('./assert.js');

describe('Example tests', () => {
  it('should pass', () => {
    expect(1).toBe(1);
  });

  it('should fail', () => {
    expect(1).toBe(2);
  });
});