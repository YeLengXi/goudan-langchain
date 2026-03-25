# 搜索引擎

const searchByKeyword = (logs, keyword) => {
  return logs.filter(log => log.message.includes(keyword) || log.error.includes(keyword));
};

const filterByTimeRange = (logs, startTime, endTime) => {
  return logs.filter(log => new Date(log.timestamp) >= new Date(startTime) && new Date(log.timestamp) <= new Date(endTime));
};

const filterByLogLevel = (logs, level) => {
  return logs.filter(log => log.level === level);
};

module.exports = {
  searchByKeyword,
  filterByTimeRange,
  filterByLogLevel
};