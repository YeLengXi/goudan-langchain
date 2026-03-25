const fs = require('fs');
const path = require('path');

const logFormats = {
    'app': /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3} [A-Z]+ (.+)$/,
    'apache': /^\[(.+)\] "(.+)" (.+) (.+) "(.+)" "(.+)"$/,
    'error': /^.*Error:.+$/
};

function parseLog(logLine, format) {
    const regex = logFormats[format];
    if (!regex) {
        throw new Error(`Unsupported log format: ${format}`);
    }

    const match = logLine.match(regex);
    if (!match) {
        return null;
    }

    return match[1];
}

function countErrors(logData) {
    const errorTypes = {};
    logData.forEach(logLine => {
        if (logLine.error) {
            const errorType = logLine.error;
            errorTypes[errorType] = (errorTypes[errorType] || 0) + 1;
        }
    });

    return errorTypes;
}

function searchLogs(logData, keyword, startTime, endTime, level) {
    return logData.filter(logLine => {
        const matches = logLine.message.includes(keyword) && logLine.timestamp >= startTime && logLine.timestamp <= endTime && (!level || logLine.level === level);
        return matches;
    });
}

function exportLogs(logData, format) {
    let content = '';
    switch (format) {
        case 'json':
            content = JSON.stringify(logData, null, 2);
            break;
        case 'csv':
            content = logData.map(logLine => {
                return Object.values(logLine).join(',');
            }).join('
');
            break;
        default:
            throw new Error(`Unsupported export format: ${format}`);
    }

    fs.writeFileSync('exported_logs', content);
}

const logAnalyzer = {
    parseLog,
    countErrors,
    searchLogs,
    exportLogs
};

module.exports = logAnalyzer;