const fs = require('fs');

const exportToJson = (logs) => {
  const data = JSON.stringify(logs, null, 2);
  fs.writeFileSync('exported_logs.json', data);
};

const exportToCsv = (logs) => {
  const headers = Object.keys(logs[0]).join(',');
  const rows = logs.map(log => Object.values(log).join(',')).join('
');
  const csvContent = headers + '
' + rows;
  fs.writeFileSync('exported_logs.csv', csvContent);
};

const generateReport = (logs) => {
  const report = `Log Analysis Report
-------------------
Total Logs: ${logs.length}
Most Frequent Error: ${logs.filter(log => log.level === 'ERROR').map(log => log.message).join(', ')}`;
  fs.writeFileSync('report.txt', report);
};

module.exports = {
  exportToJson,
  exportToCsv,
  generateReport
}