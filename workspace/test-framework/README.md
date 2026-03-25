# Test Framework

This is a simple JavaScript unit testing framework.

## Installation

To use this framework, you need to install it in your project.

```bash
npm install workspace-test-framework
```

## Usage

You can use the framework to write and run tests.

```javascript
const { describe, it, expect } = require('workspace-test-framework');

describe('Math operations', () => {
  it('should add numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('should subtract numbers', () => {
    expect(subtract(5, 2)).toBe(3);
  });
});
```