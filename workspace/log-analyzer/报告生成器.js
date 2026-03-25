const { parseLog } = require('./log-analyzer.cjs');
const { countErrors } = require('./错误统计器.js');
const { searchLogs } = require('./搜索引擎.js');

const exportLogs = (logData, format) => {
  switch (format) {
    case 'json':
      return JSON.stringify(logData, null, 2);
    case 'csv':
      return logData.map(entry => {
        return `${entry.timestamp},${entry.level},${entry.message}`;
      }).join('
');
    default:
      throw new Error('Unsupported export format');
  }
};

module.exports = {
  exportLogs
}