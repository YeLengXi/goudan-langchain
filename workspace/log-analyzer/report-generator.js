const fs = require('fs');

function exportToJson(logs) {
  const data = logs.map((log) => log.data);
  fs.writeFileSync('logs.json', JSON.stringify(data, null, 2));
}

function exportToCsv(logs) {
  const data = logs.map((log) => log.data.join(', ')).join('
');
  fs.writeFileSync('logs.csv', data);
}

function generateReport(logs) {
  const errorTypes = countErrors(logs);
  const sortedErrorTypes = Object.entries(errorTypes).sort((a, b) => b[1] - a[1]);
  const report = `Report:

Errors:
${sortedErrorTypes.map((entry) => `${entry[0]}: ${entry[1]} times`).join('
')}`;
  fs.writeFileSync('report.txt', report);
}

module.exports = {
  exportToJson,
  exportToCsv,
  generateReport,
}