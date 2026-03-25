# 搜索引擎

// 按关键词搜索
const searchByKeyword = (logs, keyword) => {
  return logs.filter(log => log.message.includes(keyword));
};

// 按时间范围过滤
const filterByTimeRange = (logs, startTime, endTime) => {
  return logs.filter(log => new Date(log.timestamp) >= new Date(startTime) && new Date(log.timestamp) <= new Date(endTime));
};

// 按日志级别过滤
const filterByLogLevel = (logs, level) => {
  return logs.filter(log => log.level === level);
};

module.exports = {
  searchByKeyword,
  filterByTimeRange,
  filterByLogLevel
};