const { read_file, write_file } = require('./read_file');
const { parseAppLog, parseApacheLog, parseErrorLog } = require('./log_parser');
const { countErrors, getMostFrequentError } = require('./error_counter');
const { searchLogs } = require('./search_engine');
const { exportToJson, exportToCsv, generateReport } = require('./report_generator');

const main = async () => {
  const args = process.argv.slice(2);

  const logFilePath = args[0];
  const command = args[1];

  const logContent = await read_file(logFilePath);

  let logs;

  if (command === '--error') {
    logs = parseErrorLog(logContent);
    exportToJson(logs);
  } else if (command === '--search') {
    const keyword = args[2];
    const startTime = args[3] ? new Date(args[3]).getTime() : 0;
    const endTime = args[4] ? new Date(args[4]).getTime() : Date.now();
    const level = args[5] || 'INFO';
    logs = searchLogs(parseAppLog(logContent), keyword, startTime, endTime, level);
    exportToCsv(logs);
  }

  // Add more commands as needed
};

main();