const fs = require('fs');
const path = require('path');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const logParser = require('./日志解析器').logParser;
const errorStatistics = require('./错误统计器').errorStatistics;
const searchLogs = require('./搜索引擎').searchLogs;
const exportToJSON = require('./报告生成器').exportToJSON;
const exportToCSV = require('./报告生成器').exportToCSV;
const generateReport = require('./报告生成器').generateReport;

const analyzeLog = async (logFilePath, options) => {
    const logs = logParser(logFilePath);
    errorStatistics(logs);

    if (options.error) {
        const errorStats = require('./错误统计器').getErrorStatistics();
        console.log('Error Statistics:', errorStats);
    }

    if (options.search) {
        const { keyword, startTime, endTime, level } = options.search;
        const filteredLogs = await searchLogs(logFilePath, keyword, startTime, endTime, level);
        console.log('Filtered Logs:', filteredLogs);
    }

    if (options.export) {
        switch (options.export) {
            case 'json':
                await exportToJSON(logFilePath, logs);
                break;
            case 'csv':
                await exportToCSV(logFilePath, logs);
                break;
            case 'report':
                await generateReport(logFilePath, logs);
                break;
        }
    }
};

module.exports = {
    analyzeLog
}