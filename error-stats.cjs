const { parseLog } = require('./log-analyzer.cjs');

class ErrorStats {
    constructor() {
        this.errors = {};
    }

    addError(errorType) {
        if (!this.errors[errorType]) {
            this.errors[errorType] = 0;
        }
        this.errors[errorType] += 1;
    }

    getErrorCounts() {
        return this.errors;
    }

    getMostFrequentError() {
        let mostFrequentError = null;
        let maxCount = 0;
        for (const [errorType, count] of Object.entries(this.errors)) {
            if (count > maxCount) {
                mostFrequentError = errorType;
                maxCount = count;
            }
        }
        return mostFrequentError;
    }

    static analyzeLogs(logData, format) {
        const errorStats = new ErrorStats();
        const lines = logData.split('\n');
        for (const line of lines) {
            try {
                const errorType = parseLog(line, format).includes('ERROR') ? parseLog(line, format) : null;
                if (errorType) {
                    errorStats.addError(errorType);
                }
            } catch (error) {
                // Ignore invalid lines
            }
        }
        return errorStats;
    }

    static getErrorCounts(logData, format) {
        const errorStats = ErrorStats.analyzeLogs(logData, format);
        return errorStats.getErrorCounts();
    }

    static getMostFrequentError(logData, format) {
        const errorStats = ErrorStats.analyzeLogs(logData, format);
        return errorStats.getMostFrequentError();
    }
}

module.exports = ErrorStats;
