const { parse } = require('node-cron');

const tasks = [];

function addTask(name, cron, command) {
  tasks.push({
    name,
    cron,
    command
  });
}

function deleteTask(name) {
  tasks = tasks.filter(task => task.name !== name);
}

function executeTask(task) {
  console.log(`Executing task: ${task.name} at ${new Date().toISOString()}`);
  require('child_process').exec(task.command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing task: ${task.name}`, error);
      return;
    }
    if (stderr) {
      console.error(`Error output from task: ${task.name}`, stderr);
      return;
    }
    console.log(`Task ${task.name} executed successfully`);
  });
}

function scheduleTasks() {
  tasks.forEach(task => {
    const job = parse(task.cron, () => executeTask(task), true);
    job.start();
  });
}

module.exports = { addTask, deleteTask, scheduleTasks };