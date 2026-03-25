const { read_file, write_file, exec_command, list_directory } = require('./tools');

const { parseLog } = require('../log-analyzer');

const appLog = 'E:/goudan-langchain/workspace/app.log';
const accessLog = 'E:/goudan-langchain/workspace/access.log';
const errorLog = 'E:/goudan-langchain/workspace/error.log';

const testLogs = {
  app: parseLog(appLog),
  access: parseLog(accessLog),
  error: parseLog(errorLog)
};

module.exports = {
  testLogs
};