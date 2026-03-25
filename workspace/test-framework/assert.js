const expect = require('./test.js');

const equal = (actual, expected) => {
  if (actual !== expected) {
    throw new Error(`Expected ${actual} to be equal to ${expected}`);
  }
};

const deepEqual = (actual, expected) => {
  if (!JSON.stringify(actual) === JSON.stringify(expected)) {
    throw new Error(`Expected ${actual} to be deeply equal to ${expected}`);
  }
};

const truthy = (value) => {
  if (!value) {
    throw new Error(`Expected ${value} to be truthy`);
  }
};

const falsy = (value) => {
  if (value) {
    throw new Error(`Expected ${value} to be falsy`);
  }
};

const throws = (func, error) => {
  try {
    func();
    throw new Error('Expected function to throw an error');
  } catch (thrownError) {
    if (thrownError.message !== error) {
      throw new Error(`Expected function to throw ${error}, but threw ${thrownError.message}`);
    }
  }
};

const contains = (actual, expected) => {
  if (!actual.includes(expected)) {
    throw new Error(`Expected ${actual} to contain ${expected}`);
  }
};

module.exports = { equal, deepEqual, truthy, falsy, throws, contains };