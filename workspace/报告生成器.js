const fs = require('fs');
const path = require('path');
const readline = require('readline');

function exportToJson(parsedData) {
  const jsonContent = JSON.stringify(parsedData, null, 2);
  fs.writeFileSync('exported_data.json', jsonContent, 'utf8');
}

function exportToCsv(parsedData) {
  const csvContent = parsedData.map(entry => {
    return [entry.timestamp, entry.level, entry.message].join(',');
  }).join('
');
  fs.writeFileSync('exported_data.csv', csvContent, 'utf8');
}

function generateReport(parsedData) {
  const reportContent = `Log Analysis Report

Total Entries: ${parsedData.length}
Most Frequent Error: ${parsedData.filter(entry => entry.level === 'ERROR').map(entry => entry.message).join(', ')}`;
  fs.writeFileSync('report.txt', reportContent, 'utf8');
}

module.exports = {
  exportToJson,
  exportToCsv,
  generateReport
}