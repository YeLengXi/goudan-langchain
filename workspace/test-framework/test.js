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

const run = suite => {
  suite.before.forEach(fn => fn());

  suite.tests.forEach(test => {
    try {
      test.fn();
      console.log(`  ${test.name}✓`);
    } catch (error) {
      console.error(`  ${test.name}✗`, error);
    }
  });

  suite.after.forEach(fn => fn());

  console.log(`${suite.name}
${suite.tests.length} tests passed (${suite.errors.length} failures)`);
};

module.exports = { describe, it, before, after, run };