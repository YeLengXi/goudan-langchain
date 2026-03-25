const fs = require('fs');
const path = require('path');
const logAnalyzer = require('./log-analyzer');
const errorCounter = require('./error-counter');
const searchLogs = require('./search-logs');

const reportGenerator = {
  generateReport: (parsedLogs, format) => {
    let content = '';
    switch (format) {
      case 'json':
        content = JSON.stringify(parsedLogs, null, 2);
        break;
      case 'csv':
        content = parsedLogs.map(log => [log.timestamp, log.level, log.message].join(', ')).join('\n');
        break;
      default:
        throw new Error('Unsupported format');
    }
    fs.writeFileSync('report.' + format, content);
  }
};

module.exports = reportGenerator;