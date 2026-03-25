const analyzeLog = require('./log-analyzer');
const fs = require('fs');
const path = require('path');

const exportToJSON = (logData) => {
  const content = JSON.stringify(logData, null, 2);
  fs.writeFileSync('logData.json', content, 'utf8');
};

const exportToCSV = (logData) => {
  const headers = ['type', 'line'];
  const rows = logData.map(entry => [entry.type, entry.line]);
  const content = [headers, ...rows].map(row => row.join(',')).join('\n');
  fs.writeFileSync('logData.csv', content, 'utf8');
};

const generateReport = (logData) => {
  const report = {
    total: logData.length
  };
  // Add more statistics here
  return report;
};

module.exports = { exportToJSON, exportToCSV, generateReport };