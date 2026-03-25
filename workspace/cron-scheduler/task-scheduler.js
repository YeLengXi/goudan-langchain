const { CronJob } = require('cron');
const fs = require('fs');
const path = require('path');

// 获取任务列表
const getTasks = () => {
  const configPath = path.resolve(__dirname, '../config/tasks.json');
  return JSON.parse(fs.readFileSync(configPath, 'utf-8')).tasks;
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

module.exports = {
  getTasks,
  execCommand
};
