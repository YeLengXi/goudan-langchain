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
  if (typeof actual !== 'object' || actual === null || typeof expected !== 'object' || expected === null) {
    return false;
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

const truthy = (value) => {
  return !!value;
};

const falsy = (value) => {
  return !value;
};

const throws = (fn, error) => {
  try {
    fn();
    return false;
  } catch (e) {
    return e.message === error;
  }
};

const contains = (actual, expected) => {
  return actual.includes(expected);
};