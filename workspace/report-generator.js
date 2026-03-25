const fs = require('fs');
const path = require('path');

const logParser = require('./log-parser');
const errorStatistics = require('./error-statistics');
const searchEngine = require('./search-engine');

// 报告生成器
const reportGenerator = {
  generateJsonReport: (logs) => {
    const json = JSON.stringify(logs, null, 2);
    fs.writeFileSync('report.json', json);
  },
  generateCsvReport: (logs) => {
    const csv = logs.map(log => {
      return [log.timestamp, log.level, log.message].join(',');
    }).join('\n');
    fs.writeFileSync('report.csv', csv);
  },
  generateStatisticsReport: (logs) => {
    const errorTypes = errorStatistics.countErrors(logs);
    const groupedErrors = errorStatistics.groupErrorsByType(logs);
    const mostFrequentError = errorStatistics.getMostFrequentError(logs);

    const report = `Statistics Report:
Errors Count: ${Object.keys(errorTypes).length}
Most Frequent Error: ${mostFrequentError}

Grouped Errors:
${JSON.stringify(groupedErrors, null, 2)}`;
    fs.writeFileSync('statistics_report.txt', report);
  }
};

module.exports = reportGenerator;