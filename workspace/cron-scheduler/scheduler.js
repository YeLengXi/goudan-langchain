# scheduler.js

const fs = require('fs');
const path = require('path');
const { parseCronExpression } = require('./cron-parser');
const { scheduleTask } = require('./task-scheduler');

const configFilePath = process.argv[2];

if (!configFilePath) {
  console.error('请指定配置文件路径。');
  process.exit(1);
}

const configPath = path.resolve(configFilePath);
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// 添加任务
const addTask = (task) => {
  scheduleTask(task.cron, async () => {
    try {
      await execCommand(task.command);
      console.log(`任务 ${task.name} 执行成功`);
    } catch (error) {
      console.error(`任务 ${task.name} 执行失败: ${error}`);
      // 可以在这里添加重试逻辑
    }
  });
}

// 删除任务
const deleteTask = (taskName) => {
  scheduleTask.delete(taskName);
}

// 执行命令
const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    const { spawn } = require('child_process');
    const child = spawn(command, []);
    let data = '';
    child.stdout.on('data', (chunk) => { data += chunk; });
    child.stderr.on('data', (chunk) => { reject(new Error(chunk)); });
    child.on('close', (code) => {
      if (code === 0) {
        resolve(data);
      } else {
        reject(new Error('命令执行错误'));
      }
    });
  });
}

// 主程序
const main = () => {
  config.tasks.forEach(task => {
    addTask(task);
  });
}

main();
