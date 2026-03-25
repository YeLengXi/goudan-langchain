const regexTester = require('./regex-tester');

module.exports = {
  match: (pattern, text) => regexTester.match(pattern, text),
  replace: (pattern, text, replacement) => regexTester.replace(pattern, text, replacement),
  split: (pattern, text) => regexTester.split(pattern, text)
};