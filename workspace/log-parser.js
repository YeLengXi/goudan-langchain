const fs = require('fs');
const path = require('path');

// 日志解析器
const logParser = {
  parseAppLog: (logData) => {
    const lines = logData.split('\n');
    const parsedLogs = lines.map(line => {
      const [timestamp, level, message] = line.split(' '); // 假设应用日志格式为：时间戳 级别 消息
      return {
        timestamp,
        level,
        message
      };
    });
    return parsedLogs;
  },
  parseAccessLog: (logData) => {
    const lines = logData.split('\n');
    const parsedLogs = lines.map(line => {
      const regex = /^([\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2}:[\d]{2}) - - \[([\w\.-]+)\] "([\w]+) (\S+) (\S+)" \[([\d]{3}-[\d]{3})\] "([\w]+)" "([\w]+)"$/;
      const match = line.match(regex);
      if (match) {
        return {
          timestamp: match[1],
          ip: match[2],
          method: match[3],
          url: match[4],
          status: match[5],
          referer: match[6],
          user_agent: match[7]
        };
      }
    });
    return parsedLogs;
  },
  parseErrorLog: (logData) => {
    const lines = logData.split('\n');
    const parsedLogs = lines.map(line => {
      const regex = /^([\w]+):\s+([\w\.]+)\s+at\s+([\w\.]+)\(([^)]+)\)/;
      const match = line.match(regex);
      if (match) {
        return {
          errorType: match[1],
          fileName: match[2],
          methodName: match[3],
          params: match[4]
        };
      }
    });
    return parsedLogs;
  }
};

module.exports = logParser;