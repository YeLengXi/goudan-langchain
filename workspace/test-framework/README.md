# Test Framework

This is a simple JavaScript unit testing framework.

## Installation

No installation required. Just require the `test.js` and `assert.js` files in your project.

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

```

## API

- `describe(name, callback)` - Defines a test suite.
- `it(name, callback)` - Defines a test case.
- `before(callback)` - Defines a hook that runs before each test case.
- `after(callback)` - Defines a hook that runs after each test case.
- `expect` - Provides assertion methods such as `equal`, `deepEqual`, `truthy`, `falsy`, `throws`, `contains`.

## CLI

You can run tests using the following commands:

- `node test.js example.test.js`
- `node test.js tests/`
- `node test.js --verbose`
- `node test.js --watch`

