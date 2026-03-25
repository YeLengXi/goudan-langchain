const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter regex pattern: ', (regex) => {
    rl.question('Enter text to test: ', (text) => {
        const matches = text.match(new RegExp(regex));
        if (matches) {
            console.log(`Match: ${matches[0]}
Position: ${text.indexOf(matches[0])}
`);
        } else {
            console.log('No match found');
        }
        rl.close();
    });
});
