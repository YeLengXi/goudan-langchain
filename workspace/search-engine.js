const fs = require('fs');
const path = require('path');

const logParser = require('./log-parser');
const errorStatistics = require('./error-statistics');

// 搜索引擎
const searchEngine = {
  searchByKeyword: (logs, keyword) => {
    return logs.filter(log => log.message.includes(keyword));
  },
  filterByTimeRange: (logs, startTime, endTime) => {
    return logs.filter(log => new Date(log.timestamp) >= new Date(startTime) && new Date(log.timestamp) <= new Date(endTime));
  },
  filterByLogLevel: (logs, level) => {
    return logs.filter(log => log.level === level);
  }
};

module.exports = searchEngine;