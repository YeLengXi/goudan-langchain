const read_file = require('fs').readFileSync;

const countErrors = (logs) => {
    const errorTypes = {};
    logs.forEach(log => {
        if (log.level === 'ERROR') {
            const errorType = log.message;
            if (errorTypes[errorType]) {
                errorTypes[errorType] += 1;
            } else {
                errorTypes[errorType] = 1;
            }
        }
    });

    const sortedErrors = Object.entries(errorTypes).sort((a, b) => b[1] - a[1]);

    return sortedErrors;
};

module.exports = {
    countErrors
}