const { parse } = require('cron-parser');

class Scheduler {
  constructor(configPath) {
    this.configPath = configPath;
    this.tasks = [];
    this.parser = parse;
  }

  async loadConfig() {
    const config = await read_file(this.configPath);
    this.tasks = config.tasks.map(task => ({
      ...task,
      nextRun: this.parser.parse(task.cron)
    }));
  }

  async addTask(task) {
    const nextRun = this.parser.parse(task.cron);
    this.tasks.push({
      ...task,
      nextRun
    });
  }

  async removeTask(taskName) {
    this.tasks = this.tasks.filter(task => task.name !== taskName);
  }

  async run() {
    while (true) {
      const now = new Date();
      const task = this.tasks.find(task => now >= task.nextRun);
      if (task) {
        console.log(`Running task ${task.name} at ${now.toISOString()}`);
        await exec_command(task.command);
        task.nextRun = this.parser.parse(task.cron);
      }
      const delay = task ? Math.max(0, task.nextRun - now) : 1000 * 60 * 60;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

module.exports = Scheduler;