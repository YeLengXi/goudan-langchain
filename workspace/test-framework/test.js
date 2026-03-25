const describe = (name, fn) => {
  console.log(`
${name}`);
  return fn();
};

const it = (name, fn) => {
  try {
    console.log(`  ${name}`);
    fn();
    console.log('  ✓');
  } catch (error) {
    console.error(`  ✗ ${name}
    ${error}
  }
};

const before = (fn) => {
  beforeHooks.push(fn);
};

const after = (fn) => {
  afterHooks.push(fn);
};

const expect = (value) => {
  return {
    toBe: (expected) => {
      if (value !== expected) {
        throw new Error(`Expected ${value} to be ${expected}, but got ${value}`);
      }
    },
    toEqual: (expected) => {
      if (!deepEqual(value, expected)) {
        throw new Error(`Expected ${value} to be equal to ${expected}, but got ${value}`);
      }
    },
    toTruthy: () => {
      if (!value) {
        throw new Error('Expected value to be truthy');
      }
    },
    toFalsy: () => {
      if (value) {
        throw new Error('Expected value to be falsy');
      }
    },
    toThrow: (error) => {
      try {
        value();
      } catch (thrown) {
        if (thrown !== error) {
          throw new Error(`Expected ${value} to throw ${error}, but threw ${thrown}`);
        }
      }
    },
    toContain: (expected) => {
      if (!value.includes(expected)) {
        throw new Error(`Expected ${value} to contain ${expected}, but got ${value}`);
      }
    }
  ];
};

const deepEqual = (a, b) => {
  if (a === b) return true;
  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }
  return true;
};
