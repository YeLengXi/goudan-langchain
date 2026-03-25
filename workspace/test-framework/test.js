const describe = (name, callback) => {
  console.log(`
${name}`);
  callback();
};

const it = (name, callback) => {
  try {
    console.log(`  ${name}`);
    callback();
    console.log('  ✓');
  } catch (error) {
    console.error(`  ✗ ${name}
    ${error}
`);
  }
};

const before = (callback) => {
  console.log(`
Before: ${callback.name}`);
  callback();
};

const after = (callback) => {
  console.log(`
After: ${callback.name}`);
  callback();
};