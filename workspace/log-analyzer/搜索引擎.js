const fs = require('fs');

const searchLogs = (logs, keyword, startTime, endTime, level) => {
    return logs.filter(log => {
        const matchesKeyword = log.message.includes(keyword);
        const withinTimeRange = log.timestamp >= startTime && log.timestamp <= endTime;
        const matchesLevel = !level || log.level === level;

        return matchesKeyword && withinTimeRange && matchesLevel;
    });
};

module.exports = {
    searchLogs
}