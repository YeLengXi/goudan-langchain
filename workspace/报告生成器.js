const fs = require('fs');

module.exports = {
  exportToJson: (logs) => {
    const content = JSON.stringify(logs, null, 2);
    fs.writeFileSync('exported_logs.json', content);
  },

  exportToCsv: (logs) => {
    const content = logs.map(log => [log.timestamp, log.level, log.message].join(',')).join('
');
    fs.writeFileSync('exported_logs.csv', content);
  },

  generateReport: (logs) => {
    const errorTypes = require('../错误统计器').countErrors(logs);
    const mostFrequentError = require('../错误统计器').getMostFrequentError(errorTypes);
    const report = `Most Frequent Error: ${mostFrequentError}

Error Types:
${Object.keys(errorTypes).map(type => `${type}: ${errorTypes[type]} times`).join('
')}`;
    fs.writeFileSync('report.txt', report);
  }
}