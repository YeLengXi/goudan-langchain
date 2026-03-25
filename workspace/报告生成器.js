const fs = require('fs');
const path = require('path');

const exportToJson = (logs) => {
  const jsonData = JSON.stringify(logs, null, 2);
  fs.writeFileSync('logs.json', jsonData, 'utf-8');
};

const exportToCsv = (logs) => {
  const csvData = logs.map(log => log.join(',')).join('
');
  fs.writeFileSync('logs.csv', csvData, 'utf-8');
};

const generateReport = (logs) => {
  const reportData = {
    totalLogs: logs.length
  }
  fs.writeFileSync('report.json', JSON.stringify(reportData, null, 2), 'utf-8');
};

module.exports = {
  exportToJson,
  exportToCsv,
  generateReport
}