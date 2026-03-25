const { parse } = require('cron-parser');

class Scheduler {
  constructor(configPath) {
    this.configPath = configPath;
    this.tasks = [];
    this.parser = parse;
  }

  async loadConfig() {
    const config = await this.readConfig();
    this.tasks = config.tasks.map(task => ({
      ...task,
      nextRun: this.parser.parse(task.cron).next(),
    }));
  }

  async readConfig() {
    const content = await read_file({ file_path: this.configPath });
    return JSON.parse(content);
  }

  async addTask(task) {
    const nextRun = this.parser.parse(task.cron).next();
    this.tasks.push({
      ...task,
      nextRun,
    });
  }

  async removeTask(taskName) {
    this.tasks = this.tasks.filter(task => task.name !== taskName);
  }

  async run() {
    const now = new Date();
    const taskToRun = this.tasks.find(task => task.nextRun <= now);
    if (taskToRun) {
      await this.execCommand(taskToRun.command);
      this.logTaskExecution(taskToRun.name);
      this.updateNextRun(taskToRun);
    }
  }

  async execCommand(command) {
    try {
      await exec_command({ command: command });
    } catch (error) {
      console.error(`Error executing command: ${command}`, error);
    }
  }

  logTaskExecution(taskName) {
    console.log(`Task ${taskName} executed at ${new Date().toISOString()}`);
  }

  updateNextRun(task) {
    task.nextRun = this.parser.parse(task.cron).next();
  }
}

module.exports = Scheduler;