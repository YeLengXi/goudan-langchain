const fs = require('fs');
const { logParser } = require('./log-parser');
const { countErrors, groupErrorsByType, getMostFrequentError } = require('./error-statistics');
const { generateJsonReport, generateCsvReport, generateStatisticsReport } = require('./report-generator');

// 搜索引擎
const searchEngine = {
  searchByKeyword: (logs, keyword) => {
    return logs.filter(log => log.includes(keyword));
  },
  filterByTimeRange: (logs, start, end) => {
    return logs.filter(log => new Date(logParser.parseApplicationLog(log).timestamp) >= new Date(start) && new Date(logParser.parseApplicationLog(log).timestamp) <= new Date(end));
  },
  filterByLogLevel: (logs, level) => {
    return logs.filter(log => log.includes(level));
  }
};

module.exports = searchEngine;