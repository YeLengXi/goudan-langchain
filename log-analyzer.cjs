const read_file = require('fs').readFileSync;

const按关键词搜索 = (parsedLogs, keyword) => {
    return parsedLogs.filter(log => log.message.includes(keyword));
};

const按时间范围过滤 = (parsedLogs, startDate, endDate) => {
    return parsedLogs.filter(log => new Date(log.timestamp) >= new Date(startDate) && new Date(log.timestamp) <= new Date(endDate));
};

const按日志级别过滤 = (parsedLogs, level) => {
    return parsedLogs.filter(log => log.level === level);
};

module.exports = {
    按关键词搜索,
    按时间范围过滤,
    按日志级别过滤
}