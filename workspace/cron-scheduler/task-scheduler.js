const schedule = require('node-schedule');
const fs = require('fs');
const path = require('path');
const { parseCron } = require('./cron-parser');
const logPath = path.join(__dirname, 'task-log.txt');

module.exports = {
  scheduleTask: (command, cronTime) => {
    const job = schedule.scheduleJob(cronTime, () => {
      const startTime = new Date();
      console.log(`Starting task: ${command} at ${startTime.toISOString()}`);
      fs.appendFileSync(logPath, `Starting task: ${command} at ${startTime.toISOString()}
`);
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing ${command}: ${error}
${stderr}`);
          fs.appendFileSync(logPath, `Error executing ${command}: ${error}
${stderr}
`);
        } else {
          console.log(`Finished task: ${command} at ${new Date().toISOString()}`);
          fs.appendFileSync(logPath, `Finished task: ${command} at ${new Date().toISOString()}
`);
        }
      });
    });
  },
};