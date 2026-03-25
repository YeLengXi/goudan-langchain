const expect = require('./test-framework/assert.js');

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

describe('Math operations', () => {
  before(() => {
    console.log('Running before all tests');
  });

  after(() => {
    console.log('Running after all tests');
  });

  it('should add numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('should subtract numbers', () => {
    expect(subtract(5, 2)).toBe(3);
  });
});