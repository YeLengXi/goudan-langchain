const readline = require('readline');
const rl = readline.createInterface(
  {
    input: process.stdin,
    output: process.stdout
  }
);

rl.question('Enter the pattern: ', (pattern) => {
  rl.question('Enter the text: ', (text) => {
    const regex = new RegExp(pattern);

    if (regex.test(text)) {
      console.log(`Pattern: ${pattern}`);
      console.log(`Text: ${text}`);
      console.log(`Match: ${regex.exec(text)[0]}`);
      console.log(`Position: ${regex.exec(text).index}-${regex.exec(text).index + regex.exec(text)[0].length - 1}`);
    } else {
      console.log('No match found.');
    }

    rl.close();
  });
});
