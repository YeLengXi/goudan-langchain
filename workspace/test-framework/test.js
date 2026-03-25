const describe = (name, callback) => {
  console.log(`
${name}`);
  callback();
};

const it = (name, callback) => {
  try {
    console.log(`  ${name}`);
    callback();
  } catch (error) {
    console.error(`  ✖ ${name}
    ${error}
  }
};

const before = (callback) => {
  console.log(`
Before all tests:`);
  callback();
};

const after = (callback) => {
  console.log(`
After all tests:`);
  callback();
};

module.exports = { describe, it, before, after };