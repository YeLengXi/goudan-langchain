const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const configFilePath = process.argv[2] || 'tasks.json';

// 解析cron表达式
function parseCronExpression(expression) {
  const tokens = expression.split(' ');
  return {
    minute: tokens[0],
    hour: tokens[1],
    day: tokens[2],
    month: tokens[3],
    dayOfWeek: tokens[4]
  };
}

// 执行任务
function executeTask(task) {
  console.log(`执行任务: ${task.name} - ${new Date().toISOString()}`);
  exec_command(task.command);
}

// 调度任务
function scheduleTasks(tasks) {
  tasks.forEach(task => {
    const cronExpression = parseCronExpression(task.cron);
    cron.schedule(cronExpression, () => {
      executeTask(task);
    });
  });
}

// 读取配置文件
function readConfigFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const config = JSON.parse(content);
  return config;
}

// 主程序
function main() {
  try {
    const config = readConfigFile(configFilePath);
    const tasks = config.tasks;
    scheduleTasks(tasks);
  } catch (error) {
    console.error('错误:', error);
  }
}

main();