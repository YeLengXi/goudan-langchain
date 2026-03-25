// example.test.js
const { describe, it, expect } = require('./test-framework/test.js');

describe('Example tests', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  it('should fail', () => {
    expect(1 + 1).toBe(3);
  });
});
