const describe = (name, callback) => {
  console.log(`
${name}`);
  callback();
};

const it = (name, callback) => {
  try {
    console.log(`  ${name}`);
    callback();
    console.log('  ✓ ');
  } catch (error) {
    console.error(`  ✗ ${name}
    ${error}
  }
};

const before = (callback) => {
  console.log(`
before: ${callback.name}`);
  callback();
};

const after = (callback) => {
  console.log(`
after: ${callback.name}`);
  callback();
};

module.exports = { describe, it, before, after };