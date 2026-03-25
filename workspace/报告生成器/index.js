const { read_file } = require('./日志解析器');
const { error_statistics } = require('./错误统计器');
const { search_logs } = require('./搜索引擎');

module.exports = {
  export_report: (logs, format) => {
    if (format === 'json') {
      return JSON.stringify(logs, null, 2);
    } else if (format === 'csv') {
      return logs.map(log => log.split(' ').join(',')).join('\n');
    } else {
      return 'Unsupported format';
    }
  },
};