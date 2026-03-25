# example.test.js
const { describe, it, expect } = require('./test.js');
const { equal } = require('./assert.js');

describe('Math operations', () => {
  it('should add numbers', () => {
    equal(1 + 2, 3);
  });

  it('should subtract numbers', () => {
    equal(5 - 2, 3);
  });
});