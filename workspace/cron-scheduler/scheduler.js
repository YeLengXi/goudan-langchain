const { parse } = require('cron-parser');

class Scheduler {
  constructor(configPath) {
    this.configPath = configPath;
    this.tasks = [];
    this.parser = parse;
    this.loadConfig();
  }

  loadConfig() {
    const config = require(this.configPath);
    this.tasks = config.tasks.map(task => ({
      ...task,
      nextRun: this.parser.parse(task.cron, { utc: true })
    }));
  }

  schedule() {
    const now = new Date();
    const task = this.tasks.find(task => task.nextRun <= now && !task.completed);
    if (task) {
      this.execTask(task);
    }
  }

  execTask(task) {
    console.log(`Executing task: ${task.name}`);
    require('child_process').exec(task.command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing task: ${task.name}`, error);
        task.retryCount += 1;
        if (task.retryCount < 3) {
          task.nextRun = this.parser.parse(task.cron, { utc: true });
          this.saveConfig();
        } else {
          console.error(`Task failed after 3 retries: ${task.name}`);
        }
      } else {
        console.log(`Task completed: ${task.name}`, stdout);
        task.completed = true;
        task.nextRun = this.parser.parse(task.cron, { utc: true });
        this.saveConfig();
      }
    });
  }

  saveConfig() {
    const config = {
      tasks: this.tasks.map(task => ({
        ...task,
        completed: false
      }))
    }
    require('fs').writeFileSync(this.configPath, JSON.stringify(config, null, 2));
  }
}

module.exports = Scheduler;