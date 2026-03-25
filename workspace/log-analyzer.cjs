const read_file = require('fs').readFileSync;

const parseAppLog = (logContent) => {
    const lines = logContent.split('
');
    const parsedLogs = [];

    lines.forEach(line => {
        const timestamp = line.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
        const level = line.match(/INFO|WARN|ERROR/);
        const message = line.replace(timestamp, '').replace(level, '').trim();

        parsedLogs.push({
            timestamp: timestamp[0],
            level: level[0],
            message: message
        });
    });

    return parsedLogs;
};

const parseApacheLog = (logContent) => {
    // Apache log parsing logic here
};

const parseErrorLog = (logContent) => {
    // Error log parsing logic here
};

const parseLog = (logContent, type) => {
    if (type === 'app') {
        return parseAppLog(logContent);
    } else if (type === 'apache') {
        return parseApacheLog(logContent);
    } else if (type === 'error') {
        return parseErrorLog(logContent);
    }
};

module.exports = {
    parseLog
}