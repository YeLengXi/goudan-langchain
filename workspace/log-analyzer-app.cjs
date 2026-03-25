const fs = require('fs');
const path = require('path');
const logAnalyzer = require('./log-analyzer');
const errorCounter = require('./error-counter');
const searchLogs = require('./search-logs');
const reportGenerator = require('./report-generator');

const logAnalyzerApp = {
  analyze: (filePath, options) => {
    const parsedLogs = logAnalyzer.parseLog(filePath);
    if (options.error) {
      const errorTypes = errorCounter.countErrors(parsedLogs);
      console.log('Error count:', Object.keys(errorTypes).length);
      console.log('Most frequent errors:', Object.entries(errorTypes).sort((a, b) => b[1] - a[1]).slice(0, 5));
    }
    if (options.search) {
      const filteredLogs = searchLogs.search(filePath, options.search, options.startTime, options.endTime, options.level);
      console.log('Filtered logs:', filteredLogs);
    }
    if (options.export) {
      reportGenerator.generateReport(parsedLogs, options.export);
    }
  }
};

module.exports = logAnalyzerApp;