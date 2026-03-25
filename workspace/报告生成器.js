const fs = require('fs');
const path = require('path');

const exportToJson = (logs) => {
  const jsonContent = JSON.stringify(logs, null, 2);
  fs.writeFileSync(path.join(__dirname, 'exported_logs.json'), jsonContent);
};

const exportToCsv = (logs) => {
  const csvContent = logs.map(log => [log.timestamp, log.level, log.message].join(',')).join('
');
  fs.writeFileSync(path.join(__dirname, 'exported_logs.csv'), csvContent);
};

const generateReport = (logs) => {
  const reportContent = `Log Analysis Report

Total Logs: ${logs.length}
Most Frequent Error: ${logs.map(log => log.level === 'ERROR' ? log.message : '').join(', ')}`;
  fs.writeFileSync(path.join(__dirname, 'report.txt'), reportContent);
};

module.exports = {
  exportToJson,
  exportToCsv,
  generateReport
}