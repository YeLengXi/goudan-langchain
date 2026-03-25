const { analyzeLog } = require('./log-analyzer.cjs');

const testAppLog = () => {
    const filePath = 'E:\goudan-langchain\workspace\test_logs\app.log';
    analyzeLog(filePath, {
        type: 'app',
        error: true
    });
};

const testApacheLog = () => {
    const filePath = 'E:\goudan-langchain\workspace\test_logs\apache.log';
    analyzeLog(filePath, {
        type: 'apache',
        error: true
    });
};

const testErrorLog = () => {
    const filePath = 'E:\goudan-langchain\workspace\test_logs\error.log';
    analyzeLog(filePath, {
        type: 'error',
        error: true
    });
};

module.exports = {
    testAppLog,
    testApacheLog,
    testErrorLog
}