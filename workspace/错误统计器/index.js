const { analyze_errors } = require('./日志解析器');

module.exports = {
  error_statistics: (logs, error_type) => {
    const error_types = {};
    logs.forEach(log => {
      const error_match = log.match(/Error: (.+)$/);
      if (error_match && error_match[1] === error_type) {
        error_types[log] = (error_types[log] || 0) + 1;
      }
    });
    return error_types;
  },
};