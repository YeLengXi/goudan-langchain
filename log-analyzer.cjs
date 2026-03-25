const fs = require('fs');

module.exports = {
  exportToJson: (logs) => {
    const jsonContent = JSON.stringify(logs, null, 2);
    fs.writeFileSync('exported_logs.json', jsonContent);
  },

  exportToCsv: (logs) => {
    const csvContent = logs.map(log => {
      return [log.timestamp, log.level, log.message].join(',');
    }).join('
');
    fs.writeFileSync('exported_logs.csv', csvContent);
  },

  generateReport: (logs) => {
    const errorTypes = require('../log-analyzer').countErrors(logs);
    const mostFrequentError = require('../log-analyzer').findMostFrequentError(errorTypes);
    const reportContent = `Error Types: ${JSON.stringify(errorTypes)}
Most Frequent Error: ${mostFrequentError}`;
    fs.writeFileSync('report.txt', reportContent);
  }
}