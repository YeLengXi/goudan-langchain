const read_file = require('fs').readFile;
const parseLog = require('../日志解析器/index');
const util = require('util');
const readFile = util.promisify(read_file);
const write_file = require('fs').writeFile;
const writeFile = util.promisify(write_file);

const searchLogs = async (logs, keyword, start, end, level) => {
  return logs.filter(log => {
    const matchesKeyword = log.message.includes(keyword);
    const matchesTimeRange = start ? new Date(log.timestamp) >= new Date(start) && new Date(log.timestamp) <= new Date(end) : true;
    const matchesLogLevel = level ? log.level === level : true;
    return matchesKeyword && matchesTimeRange && matchesLogLevel;
  });
};