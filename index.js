const { read_file, write_file, exec_command, list_directory } = require('./utils');

const { parseLog, countErrors, searchLogs, exportLogs } = require('./log-analyzer');

const logFilePath = process.argv[2];
const options = process.argv.slice(3);

const logContent = parseLog(logFilePath);

options.forEach(option => {
  const [key, value] = option.split('=');
  switch (key) {
    case '--error':
      const { errorCounts, mostFrequentError } = countErrors(logContent);
      console.log('Error Counts:', errorCounts);
      console.log('Most Frequent Error:', mostFrequentError);
      break;
    case '--search':
      const [keyword, startTime, endTime, level] = value.split(',');
      const searchResults = searchLogs(logContent, keyword, startTime, endTime, level);
      console.log('Search Results:', searchResults);
      break;
    case '--export':
      const [format] = value.split(',');
      const exportedLogs = exportLogs(logContent, format);
      write_file(exportedLogs, `exported-${format}.log`);
      break;
  }
});