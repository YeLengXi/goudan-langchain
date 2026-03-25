const read_file = require('fs').readFileSync;

const analyzeLog = (filePath, options) => {
  const logContent = read_file(filePath, 'utf8');
  const parsedLogs = parseAppLog(logContent);

  if (options.error) {
    const errorTypes = countErrors(parsedLogs);
    console.log('Error Types:', errorTypes);
  }

  if (options.search) {
    const { keyword, startTime, endTime, level } = options.search;
    const filteredLogs = searchLogs(parsedLogs, keyword, startTime, endTime, level);
    console.log('Filtered Logs:', filteredLogs);
  }

  if (options.export) {
    const { format } = options.export;
    if (format === 'json') {
      const jsonContent = exportToJson(parsedLogs);
      console.log(jsonContent);
    } else if (format === 'csv') {
      const csvContent = exportToCsv(parsedLogs);
      console.log(csvContent);
    }
  }
};

module.exports = {
  analyzeLog
}