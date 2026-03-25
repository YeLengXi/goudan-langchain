// assert.js
const expect = require('./test.js');

// 断言函数
function equal actual, expected {
  if (actual !== expected) {
    throw new Error(`Expected ${expected}, but got ${actual}`);
  }
}

function deepEqual actual, expected {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`);
  }
}

function truthy actual {
  if (!actual) {
    throw new Error('Expected truthy value, but got falsy');
  }
}

function falsy actual {
  if (actual) {
    throw new Error('Expected falsy value, but got truthy');
  }
}

function throws block, error {
  try {
    block();
  } catch (e) {
    if (e.message !== error) {
      throw new Error(`Expected to throw ${error}, but threw ${e.message}`);
    }
  }
}

function contains actual, expected {
  if (!actual.includes(expected)) {
    throw new Error(`Expected ${expected} to be contained in ${actual}`);
  }
}

module.exports = {
  equal,
  deepEqual,
  truthy,
  falsy,
  throws,
  contains
};