const fs = require('fs');
const path = require('path');

// 报告生成器
function generateReport(logData, format) {
  let content = '';
  if (format === 'json') {
    content = JSON.stringify(logData, null, 2);
  } else if (format === 'csv') {
    content = 'Timestamp,Level,Message\n' + logData.map(item => `${item.timestamp},${item.level},${item.message}`).join('\n');
  }
  return content;
}

module.exports = {
  generateReport
}