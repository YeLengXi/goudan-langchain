const fs = require('fs');
const path = require('path');

// 日志解析器
const logParser = {
  parseApplicationLog: (log) => {
    const match = log.match(/^([\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2}:[\d]{2}).*?\[(INFO|ERROR|WARN)\].*/);
    if (match) {
      return {
        timestamp: match[1],
        level: match[2],
        message: log.substring(match.index + match[0].length)
      }
    }
    return null;
  },
  parseAccessLog: (log) => {
    const match = log.match(/^([\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2}:[\d]{2}).*?"(.*?)" (\d+) (\d+) "(.*?)" "(.*?)"$/);
    if (match) {
      return {
        timestamp: match[1],
        method: match[2],
        status: match[3],
        bytes: match[4],
        request: match[5],
        referer: match[6]
      }
    }
    return null;
  },
  parseErrorLog: (log) => {
    const match = log.match(/^.*?:.*?:\s*(.*?)(:.*?:)*:.*?:\s*(.*)$/);
    if (match) {
      return {
        className: match[1],
        methodName: match[2],
        message: match[3]
      }
    }
    return null;
  }
};

module.exports = logParser;