# scheduler.js

const cron = require('cron');
const fs = require('fs');
const path = require('path');

const configPath = process.argv[2];

// 解析cron表达式
function parseCronExpression(expression) {
  return cron.parseExpression(expression);
}

// 执行任务
function executeTask(task) {
  try {
    const child = require('child_process').exec(task.command);
    child.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    child.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    child.on('close', (code) => {
      console.log(`Task ${task.name} exited with code ${code}`);
    });
  } catch (error) {
    console.error(`Error executing task ${task.name}: ${error}`);
  }
}

// 读取配置文件
function readConfig() {
  const content = fs.readFileSync(configPath, 'utf8');
  const config = JSON.parse(content);
  return config;
}

// 主函数
function main() {
  const config = readConfig();
  const tasks = config.tasks;
  tasks.forEach(task => {
    const cronJob = cron.job(task.cron, () => {
      console.log(`Executing task ${task.name} at ${new Date().toISOString()}`);
      executeTask(task);
    }, null, true);
    cronJob.start();
  });
}

// 运行主函数
main();