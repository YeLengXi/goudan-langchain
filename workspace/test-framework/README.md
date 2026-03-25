# Test Framework

This package provides a simple JavaScript unit testing framework.

## Installation

To use this framework, you need to install it in your project.

```bash
npm install --save-dev workspace-test-framework
```

## Usage

### Describing tests
To describe a group of tests, use the `describe` function.

```javascript
const { describe, it, expect } = require('workspace-test-framework');

describe('Math operations', () => {
  // tests go here
});
```

### Writing tests
To write a test, use the `it` function.

```javascript
it('should add numbers', () => {
  expect(add(1, 2)).toBe(3);
});
```

### Assertions
The framework provides a set of assertion functions to help you write tests.

```javascript
const { expect } = require('workspace-test-framework');

expect(1).toBe(1);
expect([1, 2, 3]).toEqual([1, 2, 3]);
```

## CLI

The framework comes with a command-line interface (CLI) that allows you to run tests.

```bash
node test.js example.test.js
```

For more options, see the [CLI documentation](#cli-documentation).

## Contributing

Contributions are welcome!

Please read the [contributing guidelines](#contributing-guidelines) for more information.

## License

MIT