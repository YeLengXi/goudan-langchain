const analyzeLog = require('./log-analyzer').analyzeLog;

const errorStats = (logData) => {
    const stats = {};
    logData.forEach(item => {
        if (item.type === 'error') {
            const errorType = item.line.match(/at (\S+)\((\S+)\):\/\/(\S+)\/(\S+):\s*(\d+):\s*(.*)/)[1];
            stats[errorType] = (stats[errorType] || 0) + 1;
        }
    });
    return stats;
};

module.exports = {
    errorStats
};