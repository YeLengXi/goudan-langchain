const read_file = require('fs').readFileSync;

const logFormats = {
    'app': /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3} [A-Z]+ (.+)$/,
    'apache': /^\[(.+)\] "(.+)" (.+) (.+) "(.+)" "(.+)"$/,
    'error': /^(.+)\n(.+)$/,
};

function parseLog(logData, format) {
    const regex = logFormats[format];
    if (!regex) {
        throw new Error(`Unsupported log format: ${format}`);
    }

    const match = logData.match(regex);
    if (!match) {
        throw new Error(`Invalid log data for format: ${format}`);
    }

    return match[1];
}

module.exports = {
    read_file,
    logFormats,
    parseLog,
}