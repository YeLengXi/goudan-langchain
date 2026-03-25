# 日志解析器

// 解析应用日志
const parseApplicationLog = (log) => {
  const regex = /^([\d\-\:\.\s]+) ([A-Z]+) (.+)$/;
  const match = log.match(regex);
  if (match) {
    return {
      timestamp: match[1],
      level: match[2],
      message: match[3]
    }
  }
  return null;
};

// 解析访问日志
const parseAccessLog = (log) => {
  const regex = /^([\d\-\:\.\s]+) "([\w]+) ([^ ]+) ([^ ]+)" ([^ ]+) "([^ ]+)" "([^ ]+)"$/;
  const match = log.match(regex);
  if (match) {
    return {
      timestamp: match[1],
      method: match[2],
      url: match[3],
      status: match[4],
      bytes: match[5],
      referer: match[6],
      user_agent: match[7]
    }
  }
  return null;
};

// 解析错误日志
const parseErrorLog = (log) => {
  // 这里只是一个示例，实际解析可能需要更复杂的正则表达式或解析逻辑
  const regex = /^([\d\-\:\.\s]+) [A-Z]+:(.+)/;
  const match = log.match(regex);
  if (match) {
    return {
      timestamp: match[1],
      error: match[2]
    }
  }
  return null;
};

module.exports = {
  parseApplicationLog,
  parseAccessLog,
  parseErrorLog
};