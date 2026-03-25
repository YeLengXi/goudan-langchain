const fs = require('fs');
const path = require('path');
const readline = require('readline');

const logFormats = {
  APP: /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}).*?(INFO|ERROR|WARN).*/g,
  APACHE: /^(\d{2}/\w{3}/\d{4}:\d{2}:\d{2}:\d{2} \S+) "(\S+) (\S+) (\S+)" "(\S+)" "(\S+)"$/g,
  ERROR: /^(.*):\s*(at|throw of) (.*)$/gm
};

function parseLog(logData, format) {
  const regex = logFormats[format];
  const logs = [];
  let match;

  while ((match = regex.exec(logData)) !== null) {
    logs.push(match[0]);
  }

  return logs;
}

function searchLogs(logs, keyword, level) {
  return logs.filter(log => {
    return log.includes(keyword) && (level ? log.includes(level) : true);
  });
}
