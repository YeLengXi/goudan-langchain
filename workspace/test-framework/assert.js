function equal(actual, expected) {
  if (actual !== expected) {
    throw new Error(
      "expected: " + expected + 
      " but got: " + actual
    );
  }
}

function deepEqual(actual, expected) {
  if (!equal(actual, expected)) {
    try {
      equal(JSON.stringify(actual), JSON.stringify(expected));
    } catch (e) {
      throw new Error(
        "expected deep equal: " + expected + 
        " but got: " + actual
      );
    }
  }
}

function truthy(actual) {
  if (!actual) {
    throw new Error(
      "expected truthy value, but got: " + actual
    );
  }
}

function falsy(actual) {
  if (actual) {
    throw new Error(
      "expected falsy value, but got: " + actual
    );
  }
}

function throws(block, expectedError) {
  try {
    block();
  } catch (error) {
    if (error !== expectedError) {
      throw new Error(
        "expected to throw: " + expectedError + 
        " but threw: " + error
      );
    }
  }
}

function contains(array, item) {
  if (!array.includes(item)) {
    throw new Error(
      "expected to contain: " + item + 
      " but got: " + array
    );
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