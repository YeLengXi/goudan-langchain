# Cron Scheduler

const fs = require('fs');
const path = require('path');
const { parse } = require('cron-parser');
const { exec } = require('child_process');

class CronScheduler {
  constructor(configPath) {
    this.configPath = configPath;
    this.tasks = [];
    this.loadConfig();
  }

  loadConfig() {
    try {
      const config = fs.readFileSync(this.configPath, 'utf8');
      const parsedConfig = JSON.parse(config);
      this.tasks = parsedConfig.tasks;
    } catch (error) {
      console.error('Error loading configuration:', error);
    }
  }

  addTask(name, cron, command) {
    const task = { name, cron, command };
    this.tasks.push(task);
    this.saveConfig();
  }

  deleteTask(name) {
    this.tasks = this.tasks.filter(task => task.name !== name);
    this.saveConfig();
  }

  saveConfig() {
    try {
      const config = JSON.stringify({ tasks: this.tasks }, null, 2);
      fs.writeFileSync(this.configPath, config, 'utf8');
    } catch (error) {
      console.error('Error saving configuration:', error);
    }
  }

  start() {
    this.tasks.forEach(task => {
      const parser = parse(task.cron);
      const interval = setInterval(() => {
        const now = new Date();
        if (parser.hasNext(now)) {
          exec(task.command, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error executing task ${task.name}: ${error}`);
              return;
            }
            if (stderr) {
              console.error(`Stderr for task ${task.name}: ${stderr}`);
              return;
            }
            console.log(`Task ${task.name} executed successfully`);
          });
        }
      }, 1000);
    });
  }
}

const args = process.argv.slice(2);
const configPath = args.find(arg => arg.startsWith('--config='))?.split('=')[1];

if (!configPath) {
  console.error('Configuration file path is required');
  process.exit(1);
}

const scheduler = new CronScheduler(configPath);
scheduler.start();