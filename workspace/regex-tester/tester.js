const readline = require('readline');
const rl = readline.createInterface(
  {
    input: process.stdin,
    output: process.stdout
  }
);

function testRegex(pattern, text, options) {
  try {
    const regex = new RegExp(pattern);
    let match;

    if (options.match) {
      match = regex.exec(text);
      console.log(`Pattern: ${pattern}`);
      console.log(`Text: ${text}`);
      if (match) {
        console.log(`Match: ${match[0]}`);
        console.log(`Position: ${match.index}-${match.index + match[0].length - 1}`);
      } else {
        console.log('No match found.');
      }
    }

    if (options.capture) {
      console.log('Capture groups:', match.groups);
    }

    if (options.replace) {
      console.log(`Replaced text: ${regex.replace(text, options.with)}`);
    }

    if (options.split) {
      console.log(`Split text: [${regex.split(text).join(', ')}]`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

rl.question('Enter pattern: ', (pattern) => {
  rl.question('Enter text: ', (text) => {
    rl.question('Enter options (match, capture, replace, split): ', (options) => {
      testRegex(pattern, text, options);
      rl.close();
    });
  });
})