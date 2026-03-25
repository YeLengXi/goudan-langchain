const { parse } = require('cron-parser');

const tasks = [];

function addTask(name, cron, command) {
  const parser = parse(cron, {
    iterator: true
  });
  const interval = parser.next().value;
  const timer = setInterval(() => {
    console.log(`Executing task: ${name}`);
    execCommand(command);
  }, interval);
  tasks.push({
    name,
    cron,
    command,
    timer
  });
}

function removeTask(name) {
  const task = tasks.find(t => t.name === name);
  if (task) {
    clearInterval(task.timer);
    tasks.splice(tasks.indexOf(task), 1);
  }
}

function execCommand(command) {
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

module.exports = { addTask, removeTask };