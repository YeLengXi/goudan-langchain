const assert = require('./test.js');

const equal = (actual, expected) => {
  if (actual !== expected) {
    throw new Error(`Expected ${expected}, but got ${actual}`);
  }
};

const deepEqual = (actual, expected) => {
  if (!JSON.stringify(actual) === JSON.stringify(expected)) {
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

const throws = (fn, expectedError) => {
  try {
    fn();
    throw new Error('Expected to throw an error');
  } catch (error) {
    if (error.message !== expectedError) {
      throw new Error(`Expected ${expectedError}, but got ${error.message}`);
    }
  }
};

const contains = (actual, expected) => {
  if (!actual.includes(expected)) {
    throw new Error(`Expected ${expected} to be contained in ${actual}`);
  }
};

module.exports = { equal, deepEqual, truthy, falsy, throws, contains };