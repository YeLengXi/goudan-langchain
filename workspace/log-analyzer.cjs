const read_file = require('fs').readFileSync;

const logFormats = {
  app: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3} INFO .+$/,
  access: /^\[(.+)\] "(.+)" .+ .+ .+ "(.+)" "(.+)"$/,
  error: /^.*Exception in thread "(.+)"/,
};

function parseLog(log) {
  for (let format in logFormats) {
    if (log.match(logFormats[format])) {
      return format;
    }
  }
  return null;
}

module.exports = {
  parseLog,
}