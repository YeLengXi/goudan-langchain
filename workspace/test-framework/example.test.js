// example.test.js
const { describe, it, expect } = require('./test-framework/test.js');
const { equal } = require('./test-framework/assert.js');

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}

describe('Math operations', () => {
  it('should add numbers', () => {
    equal(add(1, 2), 3);
  });

  it('should subtract numbers', () => {
    equal(subtract(5, 2), 3);
  });
});