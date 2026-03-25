const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const configFilePath = process.argv[2];

// Parse the cron expression
function parseCronExpression(expression) {
  const parts = expression.split(' ');
  return {
    minute: parseInt(parts[0], 10),
    hour: parseInt(parts[1], 10),
    day: parseInt(parts[3], 10),
    month: parseInt(parts[4], 10),
    dayOfWeek: parseInt(parts[5], 10)
  };
}

// Execute a task
function executeTask(task) {
  console.log(`Executing task: ${task.name} at ${new Date().toLocaleString()}`);
  require('child_process').exec(task.command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing task: ${task.name}`, error);
      return;
    }
    if (stderr) {
      console.error(`Stderr from task: ${task.name}`, stderr);
      return;
    }
    console.log(`Stdout from task: ${task.name}`, stdout);
  });
}

// Load and parse the configuration file
function loadConfig() {
  const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
  return config.tasks.map(task => ({
    ...task,
    cronData: parseCronExpression(task.cron)
  }));
}

// Schedule tasks
function scheduleTasks(tasks) {
  tasks.forEach(task => {
    cron.schedule(task.cronData, () => {
      executeTask(task);
    });
  });
}

// Main function
function main() {
  try {
    const tasks = loadConfig();
    scheduleTasks(tasks);
    console.log('Scheduler started.');
  } catch (error) {
    console.error('Error starting scheduler', error);
  }
}

main();