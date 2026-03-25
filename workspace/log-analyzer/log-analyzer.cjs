const fs = require('fs');
const path = require('path');
const { parseLog } = require('./log-parser');
const { countErrors } = require('./error-statistics');
const { searchLogs } = require('./search-engine');
const { exportToJson, exportToCsv, generateReport } = require('./report-generator');

const logFilePath = process.argv[2];
const options = process.argv.slice(3);

const logs = fs.readFileSync(logFilePath, 'utf-8').split('\n').map(parseLog).filter((log) => log !== null);

options.forEach((option) => {
  const [key, value] = option.split('=');
  switch (key) {
    case '--error':
      const errorTypes = countErrors(logs);
      console.log('Error types:', errorTypes);
      break;
    case '--search':
      const [keyword, startTime, endTime, level] = value.split(',');
      const filteredLogs = searchLogs(logs, keyword, new Date(startTime).getTime(), new Date(endTime).getTime(), level);
      console.log('Filtered logs:', filteredLogs);
      break;
    case '--export':
      const [format, ...rest] = value.split(',');
      switch (format) {
        case 'json':
          exportToJson(logs);
          break;
        case 'csv':
          exportToCsv(logs);
          break;
      }
      break;
  }
});