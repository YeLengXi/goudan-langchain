const fs = require('fs');

const exportToJson = (logs) => {
    const data = JSON.stringify(logs, null, 2);
    fs.writeFileSync('exported_logs.json', data);
};

const exportToCsv = (logs) => {
    const headers = 'Timestamp,Level,Message
';
    const rows = logs.map(log => {
        return `${log.timestamp},${log.level},${log.message}
`;    }).join('
');
    const data = headers + rows;
    fs.writeFileSync('exported_logs.csv', data);
};

module.exports = {
    exportToJson,
    exportToCsv
}