const fs = require('fs');

function generateReport(logData) {
  const errorCounts = require('./error-statistics').countErrors(logData);
  const sortedErrors = Object.entries(errorCounts).sort((a, b) => b[1] - a[1]);
  const mostFrequentError = sortedErrors[0] ? sortedErrors[0][0] : 'None';
  const mostFrequentCount = sortedErrors[0] ? sortedErrors[0][1] : 0;

  const report = {
    totalErrors: Object.keys(errorCounts).length,
    mostFrequentError: mostFrequentError,
    mostFrequentCount: mostFrequentCount
  }
  fs.writeFileSync('error-report.json', JSON.stringify(report, null, 2));
}

module.exports = {
  generateReport
}