const read_file = require('fs').readFile;
const write_file = require('fs').writeFile;
const parseLog = require('../日志解析器/index');
const util = require('util');
const readFile = util.promisify(read_file);
const writeFile = util.promisify(write_file);

const exportToJson = (logs) => {
  const jsonLogs = JSON.stringify(logs, null, 2);
  return new Promise((resolve, reject) => {
    write_file('logs.json', jsonLogs, err => {
      if (err) {
        reject(err);
      } else {
        resolve('logs.json');
      }
    });
  });
};

const exportToCsv = (logs) => {
  const csvLogs = logs.map(log => [log.timestamp, log.level, log.message].join(',')).join('
');
  return new Promise((resolve, reject) => {
    write_file('logs.csv', csvLogs, err => {
      if (err) {
        reject(err);
      } else {
        resolve('logs.csv');
      }
    });
  });
};

const generateStatisticsReport = (logs) => {
  const report = {
    errorCounts: countErrors(logs),
    groupedLogs: groupByType(logs),
    mostFrequentError: showMostFrequentError(logs)
  }
  return new Promise((resolve, reject) => {
    write_file('report.json', JSON.stringify(report, null, 2), err => {
      if (err) {
        reject(err);
      } else {
        resolve('report.json');
      }
    });
  });
};

module.exports = {
  exportToJson,
  exportToCsv,
  generateStatisticsReport
};