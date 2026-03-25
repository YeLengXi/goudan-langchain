const equal = (actual, expected) => {
  if (actual !== expected) {
    throw new Error(`Expected ${expected}, but got ${actual}`);
  }
};

const deepEqual = (actual, expected) => {
  if (!equal(actual, expected)) {
    throw new Error(`Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`);
  }
};

const truthy = (value) => {
  if (!value) {
    throw new Error('Expected truthy value, but got falsy');
  }
};

const falsy = (value) => {
  if (value) {
    throw new Error('Expected falsy value, but got truthy');
  }
};

const throws = (fn, error) => {
  try {
    fn();
    throw new Error('Expected to throw an error, but did not');
  } catch (thrownError) {
    if (thrownError.message !== error.message) {
      throw new Error(`Expected ${error.message}, but got ${thrownError.message}`);
    }
  }
};

const contains = (actual, expected) => {
  if (!actual.includes(expected)) {
    throw new Error(`Expected ${expected} to be contained in ${actual}`);
  }
};

module.exports = { equal, deepEqual, truthy, falsy, throws, contains };