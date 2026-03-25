const { read_file } = require('./日志解析器');
const { error_statistics } = require('./错误统计器');

module.exports = {
  search_logs: (logs, keyword, time_range, log_level) => {
    return logs.filter(log => {
      const matches_keyword = log.includes(keyword);
      const matches_time_range = !time_range || (log.includes(time_range.start) && log.includes(time_range.end));
      const matches_log_level = !log_level || log.includes(log_level);
      return matches_keyword && matches_time_range && matches_log_level;
    });
  },
};