const { describe, it, expect } = require('./test.js');

const assert = require('./assert.js');

describe('Example tests', () => {
  before(() => {
    console.log('Before all tests');
  });

  after(() => {
    console.log('After all tests');
  });

  describe('Math operations', () => {
    before(() => {
      console.log('Before math tests');
    });

    after(() => {
      console.log('After math tests');
    });

    it('should add numbers', () => {
      expect(add(1, 2)).toBe(3);
    });

    it('should subtract numbers', () => {
      expect(subtract(5, 2)).toBe(3);
    });
  });
});

module.exports = {};