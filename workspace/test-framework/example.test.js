const { describe, it, expect } = require('./test.js');
const { equal, deepEqual, truthy, falsy, throws, contains } = require('./assert.js');

describe('Example tests', () => {
  it('should test equality', () => {
    expect(1).toEqual(1);
    expect(1).not.toEqual(2);
  });

  it('should test truthiness', () => {
    expect(true).toBeTruthy();
    expect(false).not.toBeTruthy();
  });

  it('should test falsiness', () => {
    expect(false).toBeFalsy();
    expect(true).not.toBeFalsy();
  });

  it('should test throws', () => {
    expect(() => { throw new Error('Test error') }).toThrow('Test error');
  });

  it('should test contains', () => {
    expect(['a', 'b', 'c']).toContain('b');
    expect(['a', 'b', 'c']).not.toContain('d');
  });
});