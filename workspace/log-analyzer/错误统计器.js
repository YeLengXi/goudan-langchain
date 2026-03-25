const fs = require('fs');
const path = require('path');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const ERROR_STATISTICS = {};

const errorStatistics = (log) => {
    const errorType = log.level.toLowerCase();
    ERROR_STATISTICS[errorType] = (ERROR_STATISTICS[errorType] || 0) + 1;
};

const getErrorStatistics = () => {
    return ERROR_STATISTICS;
};

module.exports = {
    errorStatistics,
    getErrorStatistics
}