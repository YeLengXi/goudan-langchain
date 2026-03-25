const describe = (name, fn) => {
  console.log(
    `
${name}
`);
  fn();
};

const it = (name, fn) => {
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (error) {
    console.error(`  ✗ ${name}
    ${error}`);
  }
};

const before = (fn) => {
  fn();
};

const after = (fn) => {
  fn();
};

module.exports = { describe, it, before, after };