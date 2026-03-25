const fs = require('fs');
const path = require('path');
const { parseLog } = require('./日志解析器');
const { countErrors, getMostFrequentError } = require('./错误统计器');
const { searchLogs } = require('./搜索引擎');
const { exportToJson, exportToCsv, generateReport } = require('./报告生成器');

const analyzeLog = (filePath, options) => {
    const logContent = fs.readFileSync(filePath, 'utf-8');
    const logs = parseLog(logContent, options.type);

    if (options.error) {
        const errorTypes = countErrors(logs);
        const mostFrequentError = getMostFrequentError(errorTypes);
        console.log(`Most Frequent Error: ${mostFrequentError}
Total Errors: ${Object.keys(errorTypes).length}`);
    }

    if (options.search) {
        const { keyword, startTime, endTime, level } = options.search;
        const filteredLogs = searchLogs(logs, keyword, startTime, endTime, level);
        console.log(filteredLogs);
    }

    if (options.export) {
        if (options.export === 'json') {
            exportToJson(logs);
            console.log('Exported to JSON');
        } else if (options.export === 'csv') {
            exportToCsv(logs);
            console.log('Exported to CSV');
        } else if (options.export === 'report') {
            generateReport(logs);
            console.log('Generated Report');
        }
    }
};

module.exports = {
    analyzeLog
}