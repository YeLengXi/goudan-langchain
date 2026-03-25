const { parseLog } = require('./log-analyzer');
const { countErrors, findMostFrequentError } = require('./error-statistics');
const { searchLogs } = require('./search-engine');
const { exportToJson, exportToCsv } = require('./report-generator');

const analyzeLog = (logFilePath, options) => {
    const log = read_file(logFilePath, 'utf8');
    const logs = parseLog('app', log);

    if (options.error) {
        const errorTypes = countErrors(logs);
        const mostFrequentError = findMostFrequentError(errorTypes);
        console.log(`Most frequent error: ${mostFrequentError}`);
    }

    if (options.search) {
        const { keyword, startTime, endTime, level } = options.search;
        const filteredLogs = searchLogs(logs, keyword, startTime, endTime, level);
        console.log(filteredLogs);
    }

    if (options.export) {
        const { format } = options.export;
        if (format === 'json') {
            const jsonLogs = exportToJson(logs);
            console.log(jsonLogs);
        } else if (format === 'csv') {
            const csvLogs = exportToCsv(logs);
            console.log(csvLogs);
        }
    }
};

const read_file = require('fs').readFileSync;

module.exports = {
    analyzeLog
}