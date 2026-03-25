const fs = require('fs');
const path = require('path');

// 日志解析器
function parseAppLog(logData) {
  const lines = logData.split('
');
  const parsedLogs = [];
  lines.forEach(line => {
    const match = line.match(/^([\d\-\:/]+) ([A-Z]+) (.*)/);
    if (match) {
      const timestamp = match[1];
      const level = match[2];
      const message = match[3];
      parsedLogs.push({ timestamp, level, message });
    }
  });
  return parsedLogs;
}

function parseApacheLog(logData) {
  const lines = logData.split('
');
  const parsedLogs = [];
  lines.forEach(line => {
    const match = line.match(/^([\d\-\:/]+) \[([\d\-\:/\:\.]+)\] "(.*?)" (\d+) (\d+) "(.*?)" "(.*?)"/);
    if (match) {
      const timestamp = match[1];
      const method = match[3];
      const url = match[4];
      const status = match[5];
      const referer = match[6];
      const user_agent = match[7];
      parsedLogs.push({ timestamp, method, url, status, referer, user_agent });
    }
  });
  return parsedLogs;
}

function parseErrorLog(logData) {
  const lines = logData.split('
');
  const parsedLogs = [];
  let currentError = null;
  lines.forEach(line => {
    if (line.includes('Error')) {
      currentError = {
        timestamp: new Date().toISOString(),
        message: line
      };
    } else if (currentError) {
      currentError.stack = (currentError.stack || '').concat('
', line);
    }
  });
  return parsedLogs;
}

// 主函数
function main() {
  const logFilePath = process.argv[2];
  const logData = fs.readFileSync(logFilePath, 'utf8');

  // 根据文件扩展名解析日志
  const extension = path.extname(logFilePath);
  let parsedLogs = [];
  if (extension === '.log') {
    parsedLogs = parseAppLog(logData);
  } else if (extension === '.access_log') {
    parsedLogs = parseApacheLog(logData);
  } else if (extension === '.err') {
    parsedLogs = parseErrorLog(logData);
  }

  // 输出解析后的日志
  console.log(parsedLogs);
}

main();