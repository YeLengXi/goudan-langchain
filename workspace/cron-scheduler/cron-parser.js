const cron = require('cron');

module.exports = {
  parseCron: (cronString) => {
    const cronTime = cron.parse(cronString);
    return cronTime;
  },
};