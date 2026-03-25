const { parse } = require('node-cron');

const tasks = [];

function addTask(name, cron, command) {
  tasks.push({
    name,
    cron,
    command,
    nextRun: parse(cron)
  });
}

function removeTask(name) {
  tasks = tasks.filter(task => task.name !== name);
}

function executeTasks() {
  const now = new Date();
  for (const task of tasks) {
    if (now >= task.nextRun) {
      console.log(`Executing task: ${task.name} at ${task.nextRun.toISOString()}`);
      exec_command(task.command);
      task.nextRun = parse(task.cron);
    }
  }
}

function exec_command(command) {
  require('child_process').exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
  });
}

module.exports = {
  addTask,
  removeTask,
  executeTasks
};
