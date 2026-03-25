const { parse } = require('cron');

class Scheduler {
  constructor() {
    this.tasks = [];
  }

  addTask(name, cron, command) {
    const parsedCron = parse(cron);
    this.tasks.push({
      name,
      cron: parsedCron,
      command,
      lastRun: null
    });
  }

  removeTask(name) {
    this.tasks = this.tasks.filter(task => task.name !== name);
  }

  run() {
    const now = new Date();
    this.tasks.forEach(task => {
      if (task.lastRun === null || now - task.lastRun >= this.getCronDuration(task.cron)) {
        this.executeTask(task);
      }
    });
    setTimeout(() => this.run(), 1000);
  }

  executeTask(task) {
    console.log(`Running task: ${task.name} at ${new Date().toLocaleTimeString()}`);
    exec_command(task.command);
    task.lastRun = new Date();
  }

  getCronDuration(cron) {
    // This is a simplified version of getting the next run time duration.
    // It is not a complete implementation.
    const nextRun = cron.next();
    return nextRun - new Date();
  }
}

module.exports = Scheduler;