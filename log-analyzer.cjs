const read_file = require('fs').readFileSync;

const logFormats = {
    'app': /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3} [A-Z]+ (.+)$/g,
    'apache': /^\[(.*?)\] "(.*?)" (\d+) (\d+) "(.*?)" "(.*?)"$/g,
    'error': /^.*Exception in thread "(.*?)": (.*?)$/g,
}

function parseLog(logContent, format) {
    const regex = logFormats[format];
    const logs = logContent.match(regex);
    return logs ? logs.map(log => log.match(/(.+)$/)[1]) : [];
}

module.exports = {
    parseLog,
    logFormats
}