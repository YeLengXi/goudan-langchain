const cron = require('cron');
const fs = require('fs');
const path = require('path');
const { parseCronExpression } = require('./cron-parser');

const Scheduler = {
  tasks: {},

  loadConfig: function (configPath) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    config.tasks.forEach(task => {
      this.addTask(task);
    });
  },

  addTask: function (task) {
    const { cron, command, name } = task;
    const interval = parseCronExpression(cron);
    const taskObject = {
      interval,
      command,
      name
    ];

    this.tasks[name] = taskObject;
    this.scheduleTask(taskObject);
  },

  removeTask: function (name) {
    const task = this.tasks[name];
    if (task) {
      clearInterval(task.interval);
      delete this.tasks[name];
    }
  },

  scheduleTask: function (task) {
    const { interval, command, name } = task;
    interval.schedule(() => {
      console.log(`Running task: ${name}`);
      exec_command(command);
    });
  }
};

module.exports = Scheduler;