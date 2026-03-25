const fs = require('fs');
const path = require('path');
const { parseAppLog, parseAccessLog, parseErrorLog } = require('./log-parser');
const { countErrors, groupErrorsByType } = require('./error-statistics');
const { searchLogs, filterLogsByTime, filterLogsByLevel } = require('./search-engine');
const { generateJsonReport, generateCsvReport, generateHtmlReport } = require('./report-generator');

// 日志解析器
function parseLog(logContent) {
  const logType = determineLogType(logContent);
  switch (logType) {
    case 'app':
      return parseAppLog(logContent);
    case 'access':
      return parseAccessLog(logContent);
    case 'error':
      return parseErrorLog(logContent);
    default:
      throw new Error('Unsupported log type');
  }
}

// 错误统计器
function countErrors(logContent) {
  const logs = parseLog(logContent);
  return countErrors(logs);
}

// 搜索引擎
function searchLogs(logContent, keyword, startTime, endTime, level) {
  const logs = parseLog(logContent);
  return searchLogs(logs, keyword, startTime, endTime, level);
}

// 报告生成器
function generateReport(logContent, errors, searchResults) {
  const logs = parseLog(logContent);
  const errorCounts = countErrors(logs);
  const groupedErrors = groupErrorsByType(errorCounts);
  const filteredLogs = filterLogsByTime(logs, startTime, endTime);
  const filteredSearchResults = filterLogsByLevel(searchResults, level);

  const reportContent = generateJsonReport(logs, errorCounts, groupedErrors, filteredLogs, filteredSearchResults);
  write_file(path.join(__dirname, 'report.json'), reportContent);
}

// 导出功能
function exportLogs(logContent, format) {
  const logs = parseLog(logContent);
  switch (format) {
    case 'json':
      generateJsonReport(logs);
      break;
    case 'csv':
      generateCsvReport(logs);
      break;
    case 'html':
      generateHtmlReport(logs);
      break;
    default:
      throw new Error('Unsupported format');
  }
}

// 主函数
function main() {
  const logFilePath = process.argv[2];
  const options = process.argv.slice(3);

  const logContent = fs.readFileSync(logFilePath, 'utf8');

  options.forEach(option => {
    if (option.startsWith('--error')) {
      const errors = countErrors(logContent);
      console.log(errors);
    }
    if (option.startsWith('--search')) {
      const [_, keyword, startTime, endTime, level] = option.match(/--search (.+) --start (.+) --end (.+) --level (.+)/);
      const searchResults = searchLogs(logContent, keyword, startTime, endTime, level);
      console.log(searchResults);
    }
    if (option.startsWith('--export')) {
      const [_, format] = option.match(/--export (.+)/);
      exportLogs(logContent, format);
    }
  });
}

main();