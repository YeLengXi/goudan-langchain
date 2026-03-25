const read_file = require('fs').readFileSync;
const write_file = require('fs').writeFileSync;

const exportToJson = (parsedLogs) => {
  const jsonContent = JSON.stringify(parsedLogs, null, 2);
  write_file('exported_logs.json', jsonContent);
};

const exportToCsv = (parsedLogs) => {
  const csvContent = parsedLogs.map(log => {
    return `${log.timestamp},${log.level},${log.message}`;
  }).join('
');
  write_file('exported_logs.csv', csvContent);
};

const generateReport = (parsedLogs) => {
  const errorCounts = countErrors(parsedLogs);
  const reportContent = `Report:
${errorCounts.map(error => `${error[0]}: ${error[1]} times`).join('
')}`;
  write_file('report.txt', reportContent);
};

module.exports = {
  exportToJson,
  exportToCsv,
  generateReport
}