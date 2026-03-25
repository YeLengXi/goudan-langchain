# test.js
const describe = (name, callback) => {
  console.log(name);
  callback();
}

const it = (name, callback) => {
  try {
    callback();
    console.log(`  ✓ ${name}`);
  } catch (error) {
    console.error(`  ✗ ${name}
    ${error}`);
  }
}

const before = (callback) => {
  console.log('Before');
  callback();
}

const after = (callback) => {
  console.log('After');
  callback();
}

module.exports = { describe, it, before, after };