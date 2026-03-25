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
    suite.before.forEach(fn => fn());
    suite.tests.push({ name, fn });
    suite.after.forEach(fn => fn());
  };
};

const before = fn => suite => suite.before.push(fn);

const after = fn => suite => suite.after.push(fn);

module.exports = { describe, it, before, after };