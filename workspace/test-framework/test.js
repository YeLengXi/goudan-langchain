const describe = (name, fn) => {
  const suite = {
    name,
    tests: [],
    before: [],
    after: [],
  };

  fn(suite);

  return suite;
};

const it = (name, fn) => {
  return suite => {
    suite.tests.push({ name, fn });
  };
};

const before = (fn) => {
  return suite => {
    suite.before.push(fn);
  };
};

const after = (fn) => {
  return suite => {
    suite.after.push(fn);
  };
};

module.exports = { describe, it, before, after };