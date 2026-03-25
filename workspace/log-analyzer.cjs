const fs = require('fs');
const path = require('path');

const supportedFormats = ['app.log', 'access.log', 'error.log'];

const logAnalyzer = {
  parseAppLog: (logContent) => {
    const lines = logContent.split('
');
    const parsedLogs = [];
    lines.forEach(line => {
      const match = line.match(/^([\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2}:[\d]{2}).*?\[(INFO|ERROR|WARN)\].*?(\S+): (.*)/);
      if (match) {
        const timestamp = match[1];
        const level = match[2];
        const component = match[3];
        const message = match[4];
        parsedLogs.push({ timestamp, level, component, message });
      }
    });
    return parsedLogs;
  },
  parseAccessLog: (logContent) => {
    const lines = logContent.split('
');
    const parsedLogs = [];
    lines.forEach(line => {
      const match = line.match(/^([\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2}:[\d]{2}).*?"(.*?)"  (\d+) -(\d+) -(\d+) "(.*?)" "(.*?)"/);
      if (match) {
        const timestamp = match[1];
        const method = match[2];
        const code = match[3];
        const size = match[4];
        const referrer = match[5];
        const agent = match[6];
        parsedLogs.push({ timestamp, method, code, size, referrer, agent });
      }
    });
    return parsedLogs;
  },
  parseErrorLog: (logContent) => {
    const lines = logContent.split('
');
    const parsedLogs = [];
    lines.forEach(line => {
      const match = line.match(/^([\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2}:[\d]{2}).*?(ERROR|WARN).*?(at .*)/);
      if (match) {
        const timestamp = match[1];
        const level = match[2];
        const stack = match[3];
        parsedLogs.push({ timestamp, level, stack });
      }
    });
    return parsedLogs;
  },
  parseLog: (filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const ext = path.extname(filePath);
    switch (ext) {
      case '.log':
        return this.parseAppLog(fileContent);
      case '.access.log':
        return this.parseAccessLog(fileContent);
      case '.error.log':
        return this.parseErrorLog(fileContent);
      default:
        throw new Error('Unsupported log format');
    }
  }
};

module.exports = logAnalyzer;