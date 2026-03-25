const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the regular expression: ', (regex) => {
  rl.question('Enter the text to test: ', (text) => {
    try {
      const matches = text.match(new RegExp(regex, 'g'));
      console.log(`Pattern: ${regex}`);
      console.log(`Text: ${text}`);
      if (matches) {
        console.log(`Match: ${matches.join(', ')}`);
        console.log(`Position: ${matches.map(match => `${match.index}-${match.index + match[0].length - 1}`).join(', ')}`);
      } else {
        console.log('No match found.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    rl.close();
  });
});
