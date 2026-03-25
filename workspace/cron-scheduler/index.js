const { parseCronExpression, addTask, removeTask } = require('./scheduler');

const configPath = process.argv[2];

if (!configPath) {
  console.log('Please provide a config file path.

Usage: node scheduler.js --config <path_to_config_file>');
  process.exit(1);
}

const config = require(configPath);

config.tasks.forEach(task => {
  addTask(task.name, parseCronExpression(task.cron), task.command);
});