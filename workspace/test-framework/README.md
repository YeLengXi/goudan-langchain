# Test Framework

This is a simple JavaScript unit testing framework.

## Installation

To use this framework, you need to install it in your project.

```bash
npm install workspace-test-framework
```

## Usage

### Basic Structure

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

### CLI

You can run tests using the following commands:

- `node test.js example.test.js`
- `node test.js tests/`
- `node test.js --verbose`
- `node test.js --watch`

## License

MIT