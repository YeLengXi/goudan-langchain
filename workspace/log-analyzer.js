const fs = require('fs');
const path = require('path');
const { parseApplicationLog, parseAccessLog, parseErrorLog } = require('./log-parser');
const { countErrors, groupErrorsByType, getMostFrequentError } = require('./error-statistics');
const { searchByKeyword, filterByTimeRange, filterByLogLevel } = require('./search-engine');
const { generateJsonReport, generateCsvReport, generateStatisticsReport } = require('./report-generator');

// 日志分析器入口
const logAnalyzer = {
  analyze: (logFilePath, options) => {
    const logs = [];
    const logStream = fs.createReadStream(logFilePath);
    logStream.on('data', (data) => {
      const log = data.toString().trim();
      logs.push(log);
    });
    logStream.on('end', () => {
      if (options.error) {
        const errors = logParser.parseErrorLog(logs);
        const errorStats = countErrors(errors);
        const groupedErrors = groupErrorsByType(errors);
        const mostFrequentError = getMostFrequentError(errors);
        generateStatisticsReport({ errorStats, groupedErrors, mostFrequentError });
      }
      if (options.search) {
        const keyword = options.search;
        const filteredLogs = searchByKeyword(logs, keyword);
        generateJsonReport(filteredLogs);
      }
    });
  }
};

module.exports = logAnalyzer;