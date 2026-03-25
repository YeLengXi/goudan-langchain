const readline = require('readline');
const { exec } = require('child_process');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function testRegex(pattern, text, options) {
    try {
        const regex = new RegExp(pattern);
        let match;
        let matches = [];
        let result = '';

        if (options.match) {
            while ((match = regex.exec(text)) !== null) {
                matches.push({
                    index: match.index,
                    match: match[0]
                });
            }
            result += 'Matches:
' + JSON.stringify(matches) + '
';
        }

        if (options.capture) {
            const captures = regex.exec(text);
            result += 'Capture groups:
' + JSON.stringify(captures.groups) + '
';
        }

        if (options.replace) {
            result += 'Replacement: ' + regex.replace(text, options.with) + '
';
        }

        if (options.split) {
            result += 'Split: ' + JSON.stringify(regex.split(text)) + '
';
        }

        return result;
    } catch (error) {
        return 'Error: ' + error.message;
    }
}

rl.question('Enter pattern: ', (pattern) => {
    rl.question('Enter text: ', (text) => {
        rl.question('Enter options (match, capture, replace, split): ', (options) => {
            const optionsArray = options.split(',').map(option => option.trim());
            const result = testRegex(pattern, text, { match: optionsArray.includes('match'), capture: optionsArray.includes('capture'), replace: optionsArray.includes('replace'), with: optionsArray.includes('replace') ? rl.question('Enter replacement: ') : '', split: optionsArray.includes('split') });
            console.log(result);
            rl.close();
        });
    });
});