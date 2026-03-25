const { parseLog } = require('./log-analyzer.cjs');

class SearchEngine {
    constructor(logData, format) {
        this.logData = logData;
        this.format = format;
    }

    search(keyword) {
        return this.logData.filter(line => line.includes(keyword));
    }

    filterByTimeRange(startDate, endDate) {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        return this.logData.filter(line => {
            const match = parseLog(line, this.format);
            const timestamp = new Date(match[1]).getTime();
            return timestamp >= start && timestamp <= end;
        });
    }

    filterByLogLevel(level) {
        return this.logData.filter(line => line.includes(level));
    }
}

module.exports = SearchEngine;
