const { parseLog } = require('./log-analyzer');

const countErrors = (logs) => {
    const errorTypes = {};
    logs.forEach(log => {
        if (log.level === 'ERROR') {
            const errorType = log.message;
            if (errorTypes[errorType]) {
                errorTypes[errorType]++;
            } else {
                errorTypes[errorType] = 1;
            }
        }
    });
    return errorTypes;
};

const findMostFrequentError = (errorTypes) => {
    let mostFrequentError = '';
    let maxCount = 0;
    for (const [errorType, count] of Object.entries(errorTypes)) {
        if (count > maxCount) {
            mostFrequentError = errorType;
            maxCount = count;
        }
    }
    return mostFrequentError;
};

module.exports = {
    countErrors,
    findMostFrequentError
}