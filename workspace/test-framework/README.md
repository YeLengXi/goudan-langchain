# Test Framework

This is a simple JavaScript unit test framework.

## Installation

To use this framework, you need to install it in your project.

```bash
npm install test-framework
```

## Usage

To write a test file, use the following structure:

```javascript
const { describe, it, expect } = require('test-framework');

describe('My suite', () => {
  it('should do something', () => {
    expect(someFunction()).toBe(expectedValue);
  });
});

```