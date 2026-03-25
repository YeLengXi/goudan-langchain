# Test Framework

This is a simple JavaScript unit testing framework.

## Installation

To use this framework, you need to install it in your project.

```bash
npm install test-framework
```

## Usage

To write a test, you need to require the test framework and assert library.

```javascript
const { describe, it, expect } = require('test-framework');
const { equal, deepEqual, truthy, falsy, throws, contains } = require('assert');

describe('Math operations', () => {
  it('should add numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('should subtract numbers', () => {
    expect(subtract(5, 2)).toBe(3);
  });
});
```