const fs = require('fs');
const path = require('path');

// 日志解析器
const logParser = {
  parseApplicationLog: (log) => {
    const parts = log.split(' ');
    const timestamp = parts[0];
    const level = parts[1];
    const message = parts.slice(2).join(' ');
    return {
      timestamp,
      level,
      message
    };
  },
  parseAccessLog: (log) => {
    const regex = /^(\d{2}\/\d{2}\/\d{4}:\d{2}:\d{2}:\d{2}) - (-) - "(.*?)" (\d{3}) -(.*?)$/;
    const match = log.match(regex);
    if (match) {
      return {
        timestamp: match[1],
        method: match[4],
        url: match[5],
        status: match[6]
      };
    }
  },
  parseErrorLog: (log) => {
    const regex = /^(.*?)\(.*?\): (.*?)$/g;
    const matches = log.match(regex);
    if (matches) {
      return {
        file: matches[1],
        line: matches[2]
      };
    }
  }
};

// 错误统计器
const errorStatistics = {
  countErrors: (logs) => {
    const errorTypes = {};
    logs.forEach(log => {
      const errorType = log.level;
      if (!errorTypes[errorType]) {
        errorTypes[errorType] = 0;
      }
      errorTypes[errorType] += 1;
    });
    return errorTypes;
  },
  groupErrorsByType: (logs) => {
    const errorTypes = errorStatistics.countErrors(logs);
    return errorTypes;
  },
  displayMostFrequentErrors: (logs) => {
    const errorTypes = errorStatistics.groupErrorsByType(logs);
    let mostFrequentError = null;
    let maxCount = 0;
    for (const errorType in errorTypes) {
      if (errorTypes[errorType] > maxCount) {
        mostFrequentError = errorType;
        maxCount = errorTypes[errorType];
      }
    }
    return mostFrequentError;
  }
};

// 搜索引擎
const searchEngine = {
  searchByKeyword: (logs, keyword) => {
    return logs.filter(log => log.message.includes(keyword));
  },
  filterByTimeRange: (logs, startTime, endTime) => {
    return logs.filter(log => log.timestamp >= startTime && log.timestamp <= endTime);
  },
  filterByLogLevel: (logs, level) => {
    return logs.filter(log => log.level === level);
  }
};

// 报告生成器
const reportGenerator = {
  exportToJson: (logs) => {
    const jsonLogs = logs.map(log => {
      return {
        timestamp: log.timestamp,
        level: log.level,
        message: log.message
      }
    });
    fs.writeFileSync('logs.json', JSON.stringify(jsonLogs, null, 2));
  },
  exportToCsv: (logs) => {
    const csvLogs = logs.map(log => {
      return `${log.timestamp},${log.level},${log.message}`;
    }).join('
');
    fs.writeFileSync('logs.csv', csvLogs);
  },
  generateStatisticsReport: (logs) => {
    const errorTypes = errorStatistics.groupErrorsByType(logs);
    const mostFrequentError = errorStatistics.displayMostFrequentErrors(logs);
    const report = `Statistics Report:
Errors by Type:
${JSON.stringify(errorTypes, null, 2)}
Most Frequent Error: ${mostFrequentError}`;
    fs.writeFileSync('report.txt', report);
  }
};

module.exports = {
  logParser,
  errorStatistics,
  searchEngine,
  reportGenerator
};