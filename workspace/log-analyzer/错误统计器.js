const fs = require('fs');

const countErrors = (logs) => {
    const errorTypes = {};

    logs.forEach(log => {
        if (log.level === 'ERROR') {
            const errorType = log.message.match(/(.*):/)[1];
            errorTypes[errorType] = (errorTypes[errorType] || 0) + 1;
        }
    });

    return errorTypes;
};

const getMostFrequentError = (errorTypes) => {
    let mostFrequentError = null;
    let maxCount = 0;

    for (const errorType in errorTypes) {
        if (errorTypes[errorType] > maxCount) {
            mostFrequentError = errorType;
            maxCount = errorTypes[errorType];
        }
    }

    return mostFrequentError;
};

module.exports = {
    countErrors,
    getMostFrequentError
}