const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter regex pattern: ', (pattern) => {
  rl.question('Enter text to be tested: ', (text) => {
    try {
      const regex = new RegExp(pattern);
      const match = regex.exec(text);

      if (match) {
        console.log(`Pattern: ${pattern}`);
        console.log(`Text: ${text}`);
        console.log(`Match: ${match[0]}`);
        console.log(`Position: ${match.index}-${match.index + match[0].length - 1}`);
      } else {
        console.log('No match found.');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    rl.close();
  });
});
