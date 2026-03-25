const fs = require('fs');
const path = require('path');

const logParser = require('./log-parser');
const errorStatistics = require('./error-statistics');
const searchEngine = require('./search-engine');
const reportGenerator = require('./report-generator');

// 主程序
const main = (args) => {
  const logFilePath = args[2];
  const logData = fs.readFileSync(logFilePath, 'utf-8');
  const logs = logParser.parseAppLog(logData);

  if (args.includes('--error')) {
    const errorTypes = errorStatistics.countErrors(logs);
    console.log(errorTypes);
  }

  if (args.includes('--search')) {
    const keyword = args[args.indexOf('--search') + 1];
    const filteredLogs = searchEngine.searchByKeyword(logs, keyword);
    console.log(filteredLogs);
  }

  if (args.includes('--export')) {
    const exportType = args[args.indexOf('--export') + 1];
    if (exportType === 'json') {
      reportGenerator.generateJsonReport(logs);
    } else if (exportType === 'csv') {
      reportGenerator.generateCsvReport(logs);
    } else if (exportType === 'statistics') {
      reportGenerator.generateStatisticsReport(logs);
    }
  }

};

const args = process.argv.slice(2);
main(args);