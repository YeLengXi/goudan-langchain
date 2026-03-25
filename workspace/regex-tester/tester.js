const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the regular expression: ', (regex) => {
  rl.question('Enter the text to be tested: ', (text) => {
    try {
      const pattern = new RegExp(regex, 'g');
      const matches = text.match(pattern);
      if (matches) {
        console.log(`Pattern: ${regex}`);
        console.log(`Text: ${text}`);
        matches.forEach((match, index) => {
          console.log(`Match: ${match}`);
          console.log(`Position: ${text.indexOf(match) + 1}-${text.indexOf(match) + match.length}`);
        });
      } else {
        console.log('No matches found.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    rl.close();
  });
});