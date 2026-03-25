const fs = require('fs');
const path = require('path');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const exportToJSON = async (logFilePath, logs) => {
    const jsonContent = JSON.stringify(logs, null, 2);
    await writeFileAsync(logFilePath.replace('.log', '.json'), jsonContent);
};

const exportToCSV = async (logFilePath, logs) => {
    const csvContent = Object.values(logs).map(log => [log.timestamp, log.level, log.message].join(',')).join('
');
    await writeFileAsync(logFilePath.replace('.log', '.csv'), csvContent);
};

const generateReport = async (logFilePath, logs) => {
    const reportContent = `Log Analysis Report for ${logFilePath}

Total Logs: ${logs.length}

Errors:
${Object.keys(logs).map(errorType => `  ${errorType}: ${logs[errorType].length}`).join('
')}
`;n
    await writeFileAsync(logFilePath.replace('.log', '.report'), reportContent);
};

module.exports = {
    exportToJSON,
    exportToCSV,
    generateReport
}