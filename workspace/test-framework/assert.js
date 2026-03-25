const equal = (actual, expected) => {
  if (actual === expected) {
    return true;
  }
  return false;
};

const deepEqual = (actual, expected) => {
  if (actual === expected) {
    return true;
  }
  if (typeof actual !== 'object' || typeof expected !== 'object') {
    return false;
  }
  if (Object.keys(actual).length !== Object.keys(expected).length) {
    return false;
  }
  for (const key in actual) {
    if (!deepEqual(actual[key], expected[key])) {
      return false;
    }
  }
  return true;
};

const truthy = value => value !== false && value !== 0 && value !== '' && value !== null && value !== undefined;

const falsy = value => !truthy(value);

const throws = (fn, error) => {
  try {
    fn();
    return false;
  } catch (thrownError) {
    return thrownError === error;
  }
};

const contains = (actual, expected) => actual.includes(expected);

module.exports = { equal, deepEqual, truthy, falsy, throws, contains };