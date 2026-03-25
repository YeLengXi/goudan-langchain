const { describe, it, expect } = require('./test.js');
describe('Math operations', () => {
  it('should add numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
  it('should subtract numbers', () => {
    expect(subtract(5, 2)).toBe(3);
  });
});