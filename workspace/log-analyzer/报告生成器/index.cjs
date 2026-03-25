const read_file = require('fs').readFileSync;

const exportToJson = (logs) => {
    const jsonLogs = JSON.stringify(logs, null, 2);
    return jsonLogs;
};

const exportToCsv = (logs) => {
    const csvLogs = logs.map(log => {
        return `${log.timestamp},${log.level},${log.message}`;
    }).join('
');
    return csvLogs;
};

module.exports = {
    exportToJson,
    exportToCsv
}