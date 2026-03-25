const read_file = require('fs').readFileSync;

const reportGenerator = {
  generateJsonReport: (logs) => {
    return JSON.stringify(logs, null, 2);
  },

  generateCsvReport: (logs) => {
    const headers = ['Timestamp', 'Level', 'Message'];
    let csv = headers.join(',') + '\n';
    logs.forEach((log) => {
      csv += [log.timestamp, log.level, log.message || log.stackTrace || log.errorType || ''].join(',') + '\n';n    });
    return csv;
  },

  generateStatisticsReport: (logs) => {
    const errorTypes = errorStatistics.countErrors(logs);
    let report = 'Error Statistics:\n';
    for (const errorType in errorTypes) {
      report += `${errorType}: ${errorTypes[errorType]}\n`;n    }
    return report;
  }
};

module.exports = reportGenerator;