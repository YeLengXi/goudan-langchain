# Test Framework

This is a simple JavaScript unit testing framework.

## Installation

To use this framework, you need to install it in your project.

```bash
npm install workspace-test-framework
```

## Usage

You can use the framework by requiring it in your test files.

```javascript
const { describe, it, expect } = require('workspace-test-framework/test.js');

describe('Math operations', () => {
  it('should add numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
});
```