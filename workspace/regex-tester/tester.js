const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the regular expression: ', (regex) => {
  rl.question('Enter the text to be tested: ', (text) => {
    const pattern = new RegExp(regex);
    let match;

    if ((match = pattern.exec(text)) !== null) {
      console.log(`Pattern: ${regex}`);
      console.log(`Text: ${text}`);
      console.log(`Match: ${match[0]}`);
      console.log(`Position: ${match.index}-${match.index + match[0].length - 1}`);
    } else {
      console.log('No match found.');
    }

    rl.close();
  });
});