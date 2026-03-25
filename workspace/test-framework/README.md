# Simple Test Framework

This is a simple test framework for JavaScript.

## Installation

To use this framework, you need to install it in your project.

```bash
npm install simple-test-framework
```

## Usage

```javascript
const { describe, it, expect } = require('simple-test-framework');

describe('Math operations', () => {
  it('should add numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('should subtract numbers', () => {
    expect(subtract(5, 2)).toBe(3);
  });
});
```