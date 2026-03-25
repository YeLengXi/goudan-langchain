const equal = (actual, expected) => {
  if (actual === expected) {
    return true;
  }
  throw new Error(`Expected ${expected}, but got ${actual}`);
};

const deepEqual = (actual, expected) => {
  if (actual === expected) {
    return true;
  }
  if (typeof actual !== 'object' || actual === null || typeof expected !== 'object' || expected === null) {
    return equal(actual, expected);
  }
  if (Object.keys(actual).length !== Object.keys(expected).length) {
    return false;
  }
  for (const key in actual) {
    if (!expected.hasOwnProperty(key) || !deepEqual(actual[key], expected[key])) {
      return false;
    }
  }
  return true;
};

const truthy = (value) => {
  if (value) {
    return true;
  }
  throw new Error('Expected truthy value, but got falsey');
};

const falsy = (value) => {
  if (!value) {
    return true;
  }
  throw new Error('Expected falsy value, but got truthy');
};

const throws = (fn, error) => {
  try {
    fn();
    throw new Error('Expected function to throw');
  } catch (e) {
    return equal(e, error);
  }
};

const contains = (actual, expected) => {
  if (actual.includes(expected)) {
    return true;
  }
  throw new Error(`Expected ${expected} to be contained in ${actual}`);
};

module.exports = { equal, deepEqual, truthy, falsy, throws, contains };