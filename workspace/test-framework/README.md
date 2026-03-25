# README.md
# Test Framework

This is a simple JavaScript unit testing framework.

## Features

- Test organization
- Assertion functions
- Async test support
- Error handling
- Report generation

## Usage

```javascript
const { describe, it, expect } = require('./test.js');

describe('Math operations', () => {
  it('should add numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('should subtract numbers', () => {
    expect(subtract(5, 2)).toBe(3);
  });
});
```