const read_file = require('fs').readFileSync;

const logFormats = {
  application: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3} ([A-Z]+) (.+)$/,
  access: /^\[(.+)\] "(.+)" (\d+) (\d+) (-|) "(.+)" "(.+)"$/,
  error: /^.*Exception in thread "(.+)".*Exception: (.+)$/,
};

function parseLog(log) {
  for (const [formatName, formatRegex] of Object.entries(logFormats)) {
    const match = log.match(formatRegex);
    if (match) {
      return {
        format: formatName,
        data: match.slice(1).map((part) => part.trim()),
      };
    }
  }
  return null;
}

module.exports = {
  parseLog,
  logFormats,
}