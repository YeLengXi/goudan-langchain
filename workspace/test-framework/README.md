# Test Framework

This is a simple JavaScript unit testing framework.

## Installation

No installation is required. Just require the test.js file in your project.

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

## API

- describe(name, callback)
  - Define a test suite.
- it(name, callback)
  - Define a test case.
- before(callback)
  - Define a before hook.
- after(callback)
  - Define an after hook.
- expect(value)
  - Assert the value.

## CLI

```bash
node test.js example.test.js
node test.js tests/
node test.js --verbose
node test.js --watch
```

## Contributing

Contributions are welcome. Please follow the contributing guidelines.
