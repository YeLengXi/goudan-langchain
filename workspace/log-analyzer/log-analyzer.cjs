const fs = require('fs');
const path = require('path');
const 日志解析器 = require('./日志解析器');
const 错误统计器 = require('./错误统计器');
const 搜索引擎 = require('./搜索引擎');
const 报告生成器 = require('./报告生成器');

module.exports = {
  parse_log: 日志解析器.parse_log,
  count_errors: 错误统计器.count_errors,
  search_logs: 搜索引擎.search_logs,
  generate_report: 报告生成器.generate_report
};
