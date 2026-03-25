const cron = require('cron');
const fs = require('fs');
const path = require('path');

const taskDir = path.join(__dirname, 'tasks');
const logDir = path.join(__dirname, 'logs');

if (!fs.existsSync(taskDir)) {
  fs.mkdirSync(taskDir);
}
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const tasks = [];

function parseCronExpression(expression) {
  // 实现cron表达式解析的代码
}

function addTask(task) {
  tasks.push(task);
  cron.schedule(task.cron, () => {
    execCommand(task.command);
    logTaskExecution(task.name);
  });
}

function removeTask(taskName) {
  tasks = tasks.filter(task => task.name !== taskName);
}

function logTaskExecution(taskName) {
  const logPath = path.join(logDir, `${taskName}_execution.log`);
  const logContent = `Execution time: ${new Date().toISOString()}
`;
  fs.appendFileSync(logPath, logContent);
}

function execCommand(command) {
  console.log(`Executing: ${command}`);
  require('child_process').exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
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
  logTaskExecution,
  execCommand
};