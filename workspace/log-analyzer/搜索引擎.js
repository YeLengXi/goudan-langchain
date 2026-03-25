const analyzeLog = require('./log-analyzer').analyzeLog;
const errorStats = require('./错误统计器').errorStats;

const searchLogs = (logData, keyword, startTime, endTime, level) => {
    return logData.filter(item => {
        const matchKeyword = item.line.includes(keyword);
        const matchTime = item.type === 'app' && item.line.includes(startTime) && item.line.includes(endTime);
        const matchLevel = item.type === 'app' && item.line.includes(level);
        return matchKeyword && matchTime && matchLevel;
    });
};

module.exports = {
    searchLogs
};