const cron = require('cron');
const fs = require('fs');
const path = require('path');
const { parseCron } = require('./cron-parser');
const { scheduleTask } = require('./task-scheduler');
const logPath = path.join(__dirname, 'task-log.txt');

const CONFIG_FILE = 'config.json';

const readConfig = () => {
  const configPath = path.join(__dirname, CONFIG_FILE);
  const config = fs.readFileSync(configPath, 'utf8');
  return JSON.parse(config);
};

const main = () => {
  const config = readConfig();
  const tasks = config.tasks;

  tasks.forEach(task => {
    const { cron, command } = task;
    const parsedCron = parseCron(cron);

    scheduleTask(command, parsedCron);
  });
};

module.exports = {
  main
};