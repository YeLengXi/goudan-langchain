const fs = require('fs');
const path = require('path');
const { analyzeLog } = require('./log-analyzer');
const { errorStats } = require('./错误统计器');
const { searchLogs } = require('./搜索引擎');
const { exportToJSON, exportToCSV, generateReport } = require('./报告生成器');

const main = async (filePath, options) => {
    const logData = await analyzeLog(filePath);
    if (options.error) {
        const stats = errorStats(logData);
        console.log('Error Stats:', stats);
    }
    if (options.search) {
        const { keyword, startTime, endTime, level } = options.search;
        const filteredLogs = searchLogs(logData, keyword, startTime, endTime, level);
        console.log('Filtered Logs:', filteredLogs);
    }
    if (options.export) {
        switch (options.export) {
            case 'json':
                exportToJSON(logData);
                break;
            case 'csv':
                exportToCSV(logData);
                break;
            case 'report':
                generateReport(logData);
                break;
        }
    }
};

module.exports = {
    main
};