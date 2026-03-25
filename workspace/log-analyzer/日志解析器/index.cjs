const read_file = require('fs').readFileSync;

const parseAppLog = (logData) => {
    const lines = logData.split('
');
    const parsedLogs = lines.map(line => {
        const match = line.match(/^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) - ([A-Z]+) - (.*)/);
        if (match) {
            return {
                timestamp: match[1],
                level: match[2],
                message: match[3]
            }
        }
        return null;
    }).filter(log => log !== null);

    return parsedLogs;
};

const parseApacheLog = (logData) => {
    const lines = logData.split('
');
    const parsedLogs = lines.map(line => {
        const match = line.match(/^(\d{2}\/\d{2}\/\d{4}:\d{2}:\d{2}:\d{2}) - \-(.*?) - "(.*?)" - (\d+) - (\d+)-\-(\d+) - "(.*?)"$/);
        if (match) {
            return {
                timestamp: match[1],
                method: match[4],
                url: match[5],
                status: match[6],
                bytes: match[7],
                referer: match[8]
            }
        }
        return null;
    }).filter(log => log !== null);

    return parsedLogs;
};

const parseErrorLog = (logData) => {
    const lines = logData.split('
');
    const parsedLogs = lines.map(line => {
        const match = line.match(/^([^:]+):([^:]+):(.*)/);
        if (match) {
            return {
                file: match[1],
                line: match[2],
                message: match[3]
            }
        }
        return null;
    }).filter(log => log !== null);

    return parsedLogs;
};

module.exports = {
    parseAppLog,
    parseApacheLog,
    parseErrorLog
}