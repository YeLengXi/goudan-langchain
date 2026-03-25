const { parseCronExpression } = require('cron-parser');

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const configPath = path.join(__dirname, 'tasks.json');
let tasks = [];

// 读取配置文件
function readConfig() {
  const content = fs.readFileSync(configPath, 'utf8');
  const config = JSON.parse(content);
  tasks = config.tasks || [];
}

// 解析cron表达式
function parseCronExpression(cron) {
  return parseCronExpression(cron); // 使用cron-parser模块
}

// 执行任务
function executeTask(task) {
  console.log(`执行任务: ${task.name} - ${new Date().toLocaleString()}`);
  exec(task.command, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行任务 ${task.name} 时出错: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`执行任务 ${task.name} 时有错误输出: ${stderr}`);
      return;
    }
    console.log(`任务 ${task.name} 执行完成: ${stdout}`);
  });
}

// 定时执行任务
function scheduleTasks() {
  tasks.forEach(task => {
    const cronParser = parseCronExpression(task.cron);
    const nextRun = cronParser.next();
    const interval = nextRun - Date.now();
    setTimeout(() => executeTask(task), interval);
  });
}

// 添加任务
function addTask(task) {
  tasks.push(task);
  fs.writeFileSync(configPath, JSON.stringify({ tasks: tasks }), 'utf8');
}

// 删除任务
function deleteTask(taskName) {
  tasks = tasks.filter(task => task.name !== taskName);
  fs.writeFileSync(configPath, JSON.stringify({ tasks: tasks }), 'utf8');
}

// 主程序
function main() {
  readConfig();
  scheduleTasks();
}

// 运行主程序
main();