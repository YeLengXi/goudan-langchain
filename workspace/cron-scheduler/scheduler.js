const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const CONFIG_FILE = 'config.json';

function loadConfig() {
  const configPath = path.join(__dirname, CONFIG_FILE);
  const config = fs.readFileSync(configPath, 'utf8');
  return JSON.parse(config);
}

function executeTask(task) {
  console.log(`Executing task: ${task.name} at ${new Date().toLocaleString()}`);
  exec_command(task.command);
}

function scheduleTasks() {
  const config = loadConfig();
  config.tasks.forEach(task => {
    cron.schedule(task.cron, () => {
      executeTask(task);
    });
  });
}

function exec_command(command) {
  require('child_process').exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error: ${error}`);
      console.error(`Error output: ${stderr}`);
    } else {
      console.log(`Execution successful: ${stdout}`);
    }
  });
}

module.exports = {
  scheduleTasks
};