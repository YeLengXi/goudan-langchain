const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the pattern: ', (pattern) => {
  rl.question('Enter the text: ', (text) => {
    try {
      const regex = new RegExp(pattern);
      let match;

      if ((match = regex.exec(text)) !== null) {
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