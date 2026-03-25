const describe = (name, fn) => {
  const tests = [];
  const hooks = {
    before: [],
    after: [],
  }

  fn({ before, after }, callback) => {
    hooks.before.forEach(hook => hook());
    callback(() => {
      hooks.after.forEach(hook => hook());
    });
    tests.push(...callback tests);
  }

  return ({ it, before, after }) => {
    it(name, test => tests.push(test));
    before(hook => hooks.before.push(hook));
    after(hook => hooks.after.push(hook));
  }
}

const it = (name, fn) => {
  let context = {};
  const originalFn = fn;
  return ({ expect, ...context }) => {
    let testResult;
    try {
      testResult = originalFn.call(context);
    } catch (error) {
      testResult = {
        pass: false,
        error,
      }
    }
    if (testResult && !testResult.pass) {
      throw new Error(testResult.error);
    }
  }
}

module.exports = { describe, it };