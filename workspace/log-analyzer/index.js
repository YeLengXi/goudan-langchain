const read_file = require('fs').readFile;
const parseLog = require('./日志解析器/index');
const errorStats = require('./错误统计器/index');
const searchEngine = require('./搜索引擎/index');
const reportGenerator = require('./报告生成器/index');
const util = require('util');
const readFile = util.promisify(read_file);
const writeFile = util.promisify(write_file);

const main = async (logPath) => {
  const logs = await parseLog.parseAppLog(logPath);
  const errors = errorStats.countErrors(logs);
  const groupedLogs = errorStats.groupByType(logs);
  const mostFrequentError = errorStats.showMostFrequentError(logs);
  const searchedLogs = searchEngine.searchLogs(logs, 'timeout', null, null, 'ERROR');
  const exportedLogs = await reportGenerator.exportToJson(logs);

  console.log('Errors:', errors);
  console.log('Grouped Logs:', groupedLogs);
  console.log('Most Frequent Error:', mostFrequentError);
  console.log('Searched Logs:', searchedLogs);
  console.log('Exported Logs:', exportedLogs);
};

module.exports = {
  main
};