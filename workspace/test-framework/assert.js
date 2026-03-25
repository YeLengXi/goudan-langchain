const equal = (actual, expected) => {
  if (actual === expected) {
    return true;
  }
  if (typeof actual !== 'object' && typeof expected !== 'object') {
    return false;
  }
  if (Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length !== expected.length) {
      return false;
    }
    for (let i = 0; i < actual.length; i++) {
      if (!equal(actual[i], expected[i])) {
        return false;
      }
    }
    return true;
  }
  if (Object.keys(actual).length !== Object.keys(expected).length) {
    return false;
  }
  for (let key in actual) {
    if (!expected.hasOwnProperty(key) || !equal(actual[key], expected[key])) {
      return false;
    }
  }
  return true;
}

const deepEqual = equal;

const truthy = value => !!value;
const falsy = value => !value;

const throws = (fn, error) => {
  try {
    fn();
    return false;
  } catch (actualError) {
    return equal(actualError, error);
  }
}

const contains = (actual, expected) => equal(actual, expected) || actual.includes(expected);

module.exports = { equal, deepEqual, truthy, falsy, throws, contains };