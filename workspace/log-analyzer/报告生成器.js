const fs = require('fs');

const exportToJson = (logs) => {
    const jsonContent = JSON.stringify(logs, null, 2);
    fs.writeFileSync('exported_logs.json', jsonContent);
};

const exportToCsv = (logs) => {
    const csvContent = logs.map(log => [log.timestamp, log.level, log.message].join(',')).join('
');
    fs.writeFileSync('exported_logs.csv', csvContent);
};

const generateReport = (logs) => {
    const errorTypes = require('../错误统计器').countErrors(logs);
    const mostFrequentError = require('../错误统计器').getMostFrequentError(errorTypes);

    const reportContent = `Most Frequent Error: ${mostFrequentError}
Total Errors: ${Object.keys(errorTypes).length}
`;
    fs.writeFileSync('report.txt', reportContent);
};

module.exports = {
    exportToJson,
    exportToCsv,
    generateReport
}