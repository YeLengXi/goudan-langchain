const read_file = require('fs').readFileSync;

const logFormats = {
    'app': /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} .+$/,
    'apache': /^\[(.+) \d{2}/,
    'error': /^Error:.+$/,
};

function parseLog(logContent) {
    const lines = logContent.split('\n');
    const parsedLogs = [];

    lines.forEach(line => {
        let match;
        for (const format in logFormats) {
            if ((match = line.match(logFormats[format]))) {
                parsedLogs.push({
                    type: format,
                    content: line,
                    timestamp: format === 'app' ? match[0].split(' ')[0] : null,
                    level: format === 'app' ? match[0].split(' ')[1] : null,
                    message: format === 'app' ? match[0].split(' ')[2] : line,
                });
                break;
            }
        }
    });

    return parsedLogs;
}

module.exports = {
    read_file,
    logFormats,
    parseLog,
}