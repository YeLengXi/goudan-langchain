const readline = require('readline');
const rl = readline.createInterface(
  {
    input: process.stdin,
    output: process.stdout
  }
);

const { regexTest, regexValidateEmail, regexValidatePhone, regexValidateUrl, regexValidateIp, regexValidateDate } = require('./utils');

rl.question('Enter command: ', (command) => {
  const args = command.split(' ');
  switch (args[0]) {
    case '/':
      regexTest(args[1], args[2]);
      break;
    case '--email':
      regexValidateEmail(args[1]);
      break;
    case '--phone':
      regexValidatePhone(args[1]);
      break;
    case '--url':
      regexValidateUrl(args[1]);
      break;
    case '--ip':
      regexValidateIp(args[1]);
      break;
    case '--date':
      regexValidateDate(args[1]);
      break;
    default:
      console.log('Invalid command.');
  }
  rl.close();
});

const fs = require('fs');
const path = require('path');

const regexUtilsPath = path.join(__dirname, 'utils.js');
fs.readdir(regexUtilsPath, (err, files) => {
  if (err) {
    console.error('Error reading utils directory:', err);
    return;
  }
  files.forEach(file => {
    if (file.endsWith('.js')) {
      require(regexUtilsPath + '/' + file);
    }
  });
});