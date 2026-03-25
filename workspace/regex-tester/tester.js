const regexTest = require('./regex-test');
const commander = require('commander');

const program = new commander.Command();

program
  .command('test <pattern> --text <text>')
  .description('Test a regex pattern against some text')
  .action((pattern, options) => {
    regexTest.testPattern(pattern, options.text);
  });

program
  .command('--email <email>')
  .description('Validate an email address')
  .action((email) => {
    regexTest.validateEmail(email);
  });

program
  .command('--phone <phone>')
  .description('Validate a phone number')
  .action((phone) => {
    regexTest.validatePhone(phone);
  });

program
  .command('--url <url>')
  .description('Validate a URL')
  .action((url) => {
    regexTest.validateUrl(url);
  });

program
  .command('replace <pattern> --text <text> --with <replacement>')
  .description('Replace text using a regex pattern')
  .action((pattern, options) => {
    regexTest.replaceText(pattern, options.text, options.replacement);
  });

program.parse(process.argv);