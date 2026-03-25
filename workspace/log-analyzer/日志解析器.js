const fs = require('fs');
const path = require('path');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const LOG_FORMATS = {
    APP: /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}).*?(INFO|WARN|ERROR).*/g,
    ACCESS: /^(\d{2}/\d{2}/\d{4}:\d{2}:\d{2}:\d{2} - \S+) "(\S+) (\S+) (\S+)" (\d{3}) (\S+) "(.*?)" "(.*?)"$/g,
    ERROR: /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}).*?(ERROR).*?(at .*)/g
};

const logParser = (logFilePath) => {
    const content = fs.readFileSync(logFilePath, 'utf8');
    const logs = [];

    Object.keys(LOG_FORMATS).forEach(format => {
        const regex = LOG_FORMATS[format];
        let match;
        while ((match = regex.exec(content)) !== null) {
            logs.push({
                type: format,
                timestamp: match[1],
                level: match[2],
                message: match[3] || match[7]
            });
        }
    });

    return logs;
};

module.exports = {
    logParser
}