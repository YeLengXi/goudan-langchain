const { describe, it, expect } = require('./test-framework/test.js');

const assert = require('./test-framework/assert.js');

describe('Example tests', () => {
  it('should equal numbers', () => {
    expect(1 + 2).toEqual(3);
  });

  it('should throw error', () => {
    expect(() => { throw new Error('Test error'); }).toThrow('Test error');
  });
});