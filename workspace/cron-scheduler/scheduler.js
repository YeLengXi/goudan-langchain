const cron = require('cron');

const tasks = [];

function parseCronExpression(expression) {
  const cronPattern = expression.split(' ');
  return cron.parse(cronPattern.join(' '));
}

function addTask(name, cronExpression, command) {
  const cronJob = cron.job(cronExpression, () => {
    console.log(`Task ${name} executed at ${new Date().toISOString()}`);
    execCommand(command);
  }, () => {
    console.log(`Task ${name} completed at ${new Date().toISOString()}`);
  }, (err) => {
    console.error(`Task ${name} failed at ${new Date().toISOString()}:`, err);
  });
  cronJob.start();
  tasks.push({ name, cronJob });
}

function removeTask(name) {
  const task = tasks.find(t => t.name === name);
  if (task) {
    task.cronJob.stop();
    tasks.splice(tasks.indexOf(task), 1);
    console.log(`Task ${name} removed`);
  } else {
    console.log(`Task ${name} not found`);
  }
}

function execCommand(command) {
  require('child_process').exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Command ${command} failed`, err);
    } else {
      console.log(`Command ${command} executed`, stdout, stderr);
    }
  });
}

module.exports = { parseCronExpression, addTask, removeTask };