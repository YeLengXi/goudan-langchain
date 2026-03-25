const { describe, it, expect } = require('./test.js');

const { equal, deepEqual, truthy, falsy, throws, contains } = require('./assert.js');

describe('Example tests', () => {
  it('should test equality', () => {
    expect(1).toEqual(1);
  });

  it('should test deep equality', () => {
    expect({ a: 1 }).toEqual({ a: 1 });
  });

  it('should test truthiness', () => {
    expect(true).toBeTruthy();
  });

  it('should test falsiness', () => {
    expect(false).toBeFalsy();
  });

  it('should test throws', () => {
    expect(() => { throw new Error('test error'); }).toThrow('test error');
  });

  it('should test contains', () => {
    expect(['a', 'b', 'c']).toContain('b');
  });
});
