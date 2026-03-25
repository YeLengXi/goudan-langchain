const { describe, it, expect } = require('./test-framework/test.js');

describe('Example tests', () => {
  it('should return true for truthy value', () => {
    expect(true).toBeTruthy();
  });

  it('should return false for falsy value', () => {
    expect(false).toBeFalsy();
  });
});