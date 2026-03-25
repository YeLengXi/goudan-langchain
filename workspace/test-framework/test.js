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
    console.error(`  ✖ ${name} - ${error.message}`);
  }
};

const before = (callback) => {
  console.log(`  Before: ${callback.name}`);
  callback();
};

const after = (callback) => {
  console.log(`  After: ${callback.name}`);
  callback();
};