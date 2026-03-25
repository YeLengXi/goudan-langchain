const { parseLog } = require('./log-analyzer');

const exportToJson = (logs) => {
    const jsonLogs = logs.map(log => {
        return {
            timestamp: log.timestamp,
            level: log.level,
            message: log.message
        }
    });
    return JSON.stringify(jsonLogs, null, 2);
};

const exportToCsv = (logs) => {
    const csvLogs = logs.map(log => {
        return `${log.timestamp},${log.level},${log.message}`
    }).join('
');
    return csvLogs;
};

module.exports = {
    exportToJson,
    exportToCsv
}