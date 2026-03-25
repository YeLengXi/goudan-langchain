# log-analyzer.cjs

const read_file = require('./日志解析器').read_file;
const error_statistician = require('./错误统计器').error_statistician;
const search_engine = require('./搜索引擎').search_engine;
const report_generator = require('./报告生成器').report_generator;

const analyzeLog = async (logFilePath, options) => {
  const logContent = await read_file(logFilePath);
  const parsedLogs = parseLog(logContent);

  if (options.error) {
    const errorStats = error_statistician(parsedLogs);
    const errorReport = report_generator.generateErrorReport(errorStats);
    console.log(errorReport);
  }

  if (options.search) {
    const searchResults = search_engine(parsedLogs, options.search);
    console.log(searchResults);
  }

  if (options.export) {
    const exportType = options.export.toLowerCase();
    if (exportType === 'json') {
      const jsonReport = report_generator.generateJsonReport(parsedLogs);
      console.log(jsonReport);
    }
    if (exportType === 'csv') {
      const csvReport = report_generator.generateCsvReport(parsedLogs);
      console.log(csvReport);
    }
  }
};

module.exports = { analyzeLog };