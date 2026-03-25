# cron-scheduler

const cron = require('cron');
const fs = require('fs');
const path = require('path');

const scheduler = {
  tasks: [],
  cronJobs: {},

  loadTasks: (configPath) => {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    config.tasks.forEach(task => {
      this.addTask(task.name, task.cron, task.command);
    });
  },

  addTask: (name, cron, command) => {
    const job = cron.job(cron, () => {
      console.log(`Executing task: ${name} at ${new Date().toISOString()}`);
      exec(command);
    });
    job.start();
    this.tasks.push({ name, cron, command });
    this.cronJobs[name] = job;
  },

  removeTask: (name) => {
    const index = this.tasks.findIndex(task => task.name === name);
    if (index !== -1) {
      this.cronJobs[name].stop();
      delete this.cronJobs[name];
      this.tasks.splice(index, 1);
    }
  },

  listTasks: () => {
    return this.tasks;
  }
};

module.exports = scheduler;