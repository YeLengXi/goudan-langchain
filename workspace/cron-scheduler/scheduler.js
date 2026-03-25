# scheduler.js

const cron = require('cron');
const fs = require('fs');
const path = require('path');

const tasksConfigPath = process.argv[2];

// 解析cron表达式
function parseCronExpression(expression) {
  const cronPattern = expression.split(' ');
  return cron.Cron.parse(cronPattern);
}

// 执行任务
function executeTask(task) {
  console.log(`执行任务：${task.name} - ${new Date().toLocaleString()}`);
  require('child_process').exec(task.command, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行任务 ${task.name} 时出错：${error}`);
      return;
    }
    if (stderr) {
      console.error(`执行任务 ${task.name} 时有错误输出：${stderr}`);
      return;
    }
    console.log(`任务 ${task.name} 执行完成，输出：${stdout}`);
  });
}

// 获取所有任务
function getAllTasks() {
  const tasksConfig = fs.readFileSync(tasksConfigPath, 'utf-8');
  const tasks = JSON.parse(tasksConfig).tasks;
  return tasks;
}

// 添加任务
function addTask(task) {
  const tasks = getAllTasks();
  tasks.push(task);
  fs.writeFileSync(tasksConfigPath, JSON.stringify({ tasks }, null, 2), 'utf-8');
}

// 删除任务
function deleteTask(taskName) {
  const tasks = getAllTasks();
  const index = tasks.findIndex(task => task.name === taskName);
  if (index !== -1) {
    tasks.splice(index, 1);
    fs.writeFileSync(tasksConfigPath, JSON.stringify({ tasks }, null, 2), 'utf-8');
  }
}

// 主函数
function main() {
  const tasks = getAllTasks();
  tasks.forEach(task => {
    const cronJob = cron.CronJob(task.cron, () => executeTask(task), null, true);
    cronJob.start();
    console.log(`任务 ${task.name} 已添加到调度器`);
  });
}

// 运行主函数
main();