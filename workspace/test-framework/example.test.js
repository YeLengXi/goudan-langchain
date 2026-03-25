const assert = require('./assert.js');

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
    assert.equal(add(1, 2), 3);
  });

  it('should subtract numbers', () => {
    assert.equal(subtract(5, 2), 3);
  });
});