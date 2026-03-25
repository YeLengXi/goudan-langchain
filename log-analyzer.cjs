const read_file = require('fs').readFileSync;

module.exports = {
  exportToJson: (logs) => {
    return JSON.stringify(logs, null, 2);
  },

  exportToCsv: (logs) => {
    const headers = ['timestamp', 'level', 'message'];
    const rows = logs.map(log => [
      log.timestamp,
      log.level,
      log.message
    ]);
    return headers.join(',') + '
' + rows.map(row => row.join(',')).join('
');
  },

  generateReport: (logs) => {
    const errorTypes = require('./error-statistics').countErrors(logs);
    const mostFrequentError = require('./error-statistics').findMostFrequentError(errorTypes);
    return `Total logs: ${logs.length}
Most frequent error: ${mostFrequentError}
`;}
}