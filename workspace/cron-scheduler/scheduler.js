const { parseCronExpression } = require('cron-parser');

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const configFilePath = process.argv[2];

// 解析cron表达式
function parseCronExpression(cronString) {
  const parser = parseCronExpression(cronString);
  return parser;
}

// 执行任务
function executeTask(task) {
  const { command } = task;
  console.log(`Executing task: ${command}`);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing task: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`Error output: ${stderr}`);
      return;
    }
    console.log(`Task executed successfully: ${stdout}`);
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
  const config = readConfigFile(configFilePath);
  const tasks = config.tasks || [];
  tasks.forEach(task => {
    const cronParser = parseCronExpression(task.cron);
    const nextRun = cronParser.next();
    console.log(`Next run time: ${nextRun}`);
  });
}

main();