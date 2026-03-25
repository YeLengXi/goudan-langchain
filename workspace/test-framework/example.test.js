const { describe, it, expect } = require('./test.js');

// Test suite
describe('Math operations', () => {
  // Test case
  it('should add numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  // Test case
  it('should subtract numbers', () => {
    expect(subtract(5, 2)).toBe(3);
  });
});