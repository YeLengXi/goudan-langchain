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

  const keysA = Object.keys(actual);
  const keysB = Object.keys(expected);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(actual[key], expected[key])) {
      return false;
    }
  }

  return true;
};

const truthy = value => value !== false && value !== 0 && value !== "" && value !== null && typeof value !== "undefined";

const falsy = value => !truthy(value);

const throws = (fn, error) => {
  try {
    fn();
    return false;
  } catch (e) {
    return e.message === error;
  }
};

const contains = (actual, expected) => {
  if (Array.isArray(actual) && Array.isArray(expected)) {
    return actual.includes(expected);
  }
  return equal(actual, expected);
};

module.exports = { equal, deepEqual, truthy, falsy, throws, contains };