const fs = require('fs');
const path = require('path');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const searchLogs = async (logFilePath, keyword, startTime, endTime, level) => {
    const content = await readFileAsync(logFilePath, 'utf8');
    const logs = logParser(logFilePath);
    let filteredLogs = logs.filter(log => {
        return log.message.includes(keyword) &&
               log.timestamp >= startTime &&
               log.timestamp <= endTime &&
               (!level || log.level.toLowerCase() === level.toLowerCase());
    });

    return filteredLogs;
};

module.exports = {
    searchLogs
}