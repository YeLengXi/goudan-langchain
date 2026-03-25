const path = require('path');
const fs = require('fs');
const { describe, it, before, after } = require('./test.js');
const { equal, deepEqual, truthy, falsy, throws, contains } = require('./assert.js');
const { runTests, watchTests } = require('./index.js');

const CLI = {
  run: command => {
    const args = command.split(' ');
    switch (args[0]) {
      case 'test':
        if (args.length === 2) {
          runTests(args[1]);
        } else if (args.length === 3 && args[1] === '--verbose') {
          runTests(args[2], true);
        } else if (args.length === 3 && args[1] === '--watch') {
          watchTests(args[2]);
        } else {
          console.log('Invalid arguments');
        }
        break;
      default:
        console.log('Invalid command');
    }
  }
};

module.exports = CLI;