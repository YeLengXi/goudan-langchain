const { CronJob } = require('cron');

const taskMap = new Map();

function parseCronExpression(expression) {
  // 实现cron表达式解析
}

function addTask(name, cron, command) {
  const job = new CronJob(cron, command, null, true);
  job.start();
  taskMap.set(name, job);
}

function deleteTask(name) {
  const job = taskMap.get(name);
  if (job) {
    job.stop();
    taskMap.delete(name);
  }
}

function scheduleTasks(tasks) {
  tasks.forEach(task => {
    addTask(task.name, task.cron, task.command);
  });
}

function executeCommand(command) {
  require('child_process').exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行错误: ${error}`);
      return;
    }
    console.log(`执行输出: ${stdout}`);
    if (stderr) {
      console.error(`执行错误: ${stderr}`);
    }
  });
}

module.exports = {
  parseCronExpression,
  addTask,
  deleteTask,
  scheduleTasks,
  executeCommand
};