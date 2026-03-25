const fs = require('fs');
const { logParser } = require('./log-parser');
const { countErrors, groupErrorsByType, getMostFrequentError } = require('./error-statistics');
const { searchByKeyword, filterByTimeRange, filterByLogLevel } = require('./search-engine');
const { generateJsonReport, generateCsvReport, generateStatisticsReport } = require('./report-generator');

// 错误统计器
const errorStatistics = {
  countErrors: (logs) => {
    const errorTypes = {};
    logs.forEach(log => {
      const parsedLog = logParser.parseErrorLog(log);
      if (parsedLog) {
        const errorType = parsedLog.className + ':' + parsedLog.methodName;
        errorTypes[errorType] = (errorTypes[errorType] || 0) + 1;
      }
    });
    return errorTypes;
  },
  groupErrorsByType: (logs) => {
    const errorTypes = errorStatistics.countErrors(logs);
    return Object.keys(errorTypes).map(type => ({
      type,
      count: errorTypes[type]
    }));
  },
  getMostFrequentError: (logs) => {
    const errorTypes = errorStatistics.countErrors(logs);
    return Object.keys(errorTypes).reduce((a, b) => errorTypes[a] > errorTypes[b] ? a : b);
  }
};

module.exports = errorStatistics;