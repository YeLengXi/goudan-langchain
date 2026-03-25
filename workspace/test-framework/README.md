# Test Framework

This is a simple JavaScript unit testing framework.

## Installation

No installation is required. Just require the `test.js` file in your project.

## Usage

```javascript
const { describe, it, expect } = require('./test-framework/test.js');

describe('Math operations', () => {
  it('should add numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('should subtract numbers', () => {
    expect(subtract(5, 2)).toBe(3);
  });
});

module.exports = {
  add,
  subtract,
};

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

// Run the tests
require('./test-framework/test.js');
```