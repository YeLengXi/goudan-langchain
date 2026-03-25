const { CronJob } = require('cron');

const fs = require('fs');
const path = require('path');

const configFilePath = 'tasks.json';

let tasks = [];

function loadConfig() {
  const configPath = path.join(__dirname, configFilePath);
  const configContent = fs.readFileSync(configPath, 'utf8');
  const config = JSON.parse(configContent);

  tasks = config.tasks || [];
}

function parseCronExpression(cronExpression) {
  // 简单的cron表达式解析
  const parts = cronExpression.split(' ');
  return {
    minute: parts[0],
    hour: parts[1],
    day: parts[2],
    month: parts[3],
    weekday: parts[4]
  };
}

function scheduleTasks() {
  tasks.forEach(task => {
    const cronConfig = parseCronExpression(task.cron);
    const job = new CronJob(
      cronConfig,
      () => {
        console.log(`执行任务: ${task.name}`);
        execCommand(task.command);
      },
      null,
      true
    );
    job.start();
  });
}

function execCommand(command) {
  require('child_process').exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行命令出错: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`错误输出: ${stderr}`);
      return;
    }
    console.log(`命令输出: ${stdout}`);
  });
}

loadConfig();
scheduleTasks();