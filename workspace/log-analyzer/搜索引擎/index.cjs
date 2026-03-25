const read_file = require('fs').readFileSync;

const searchLogs = (logs, keyword, startTime, endTime, level) => {
    return logs.filter(log => {
        const matchesKeyword = log.message.includes(keyword);
        const matchesTime = log.timestamp >= startTime && log.timestamp <= endTime;
        const matchesLevel = !level || log.level === level;

        return matchesKeyword && matchesTime && matchesLevel;
    });
};

module.exports = {
    searchLogs
}