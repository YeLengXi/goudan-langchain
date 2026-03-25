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
  return false;
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
    return e === error;
  }
};

const contains = (actual, expected) => {
  return actual.includes(expected);
};