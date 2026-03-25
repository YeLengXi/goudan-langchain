const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

// 读取配置文件
function readConfig(filePath) {
  const configPath = path.join(__dirname, filePath);
  const content = fs.readFileSync(configPath, 'utf-8');
  return JSON.parse(content);
}

// 解析cron表达式
function parseCronExpression(expression) {
  // 这里可以使用第三方库来解析cron表达式，但为了不使用外部依赖，我们将手动解析
  // 简单实现，只支持基本格式
  const parts = expression.split(' ');
  const cronObj = {
    minute: parts[0],
    hour: parts[1],
    day: parts[2],
    month: parts[3],
    dayOfWeek: parts[4]
  };
  return cronObj;
}

// 创建任务
function createTask(task) {
  const cronObj = parseCronExpression(task.cron);
  const job = cron.schedule(cronObj, () => {
    console.log(`执行任务: ${task.name} - ${new Date().toLocaleString()}`);
    execCommand(task.command);
  });
  job.start();
}

// 执行命令
function execCommand(command) {
  const { spawn } = require('child_process');
  const process = spawn(command);
  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  process.on('close', (code) => {
    console.log(`命令执行完成，退出码 ${code}`);
  });
}

// 主程序
function main() {
  const config = readConfig(process.argv[2]);
  config.tasks.forEach(task => {
    createTask(task);
  });
}

// 运行主程序
main();