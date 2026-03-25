# Test Framework

This is a simple JavaScript unit testing framework.

## Installation

To use this framework, simply require the `test.js` file in your project.

```javascript
const { describe, it, expect } = require('./test-framework/test.js');

// Your tests here
```

## Usage

### Basic Example

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

// Run the tests
const { run } = require('./test-framework/test.js');
run(testFramework);
```