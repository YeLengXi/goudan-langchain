const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const args = process.argv.slice(2);

let pattern = '';
let text = '';
let withText = '';

args.forEach(arg => {
  if (arg.startsWith('--')) {
    switch (arg) {
      case '--text':
        text = args[args.indexOf(arg) + 1];
        break;
      case 'replace':
        pattern = args[args.indexOf(arg) + 1];
        withText = args[args.indexOf(arg) + 2];
        break;
      default:
        pattern = arg;
        break;
    }
  }
});

try {
  if (pattern && text) {
    const matches = text.match(new RegExp(pattern));
    if (matches) {
      console.log(`Pattern: ${pattern}`);
      console.log(`Text: ${text}`);
      console.log(`Match: ${matches[0]}`);
      console.log(`Position: ${text.indexOf(matches[0])}-${text.indexOf(matches[0]) + matches[0].length - 1}`);
    } else {
      console.log('No match found.');
    }
  }

  if (pattern && withText && text) {
    const replaced = text.replace(new RegExp(pattern, 'g'), withText);
    console.log(`Pattern: ${pattern}`);
    console.log(`Text: ${text}`);
    console.log(`Replaced Text: ${replaced}`);
  }
} catch (error) {
  console.error('Error:', error.message);
}

rl.close();
