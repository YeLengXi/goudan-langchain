const { CronJob } = require('cron');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;
const configPath = argv.config || 'tasks.json';

const tasks = JSON.parse(fs.readFileSync(path.resolve(__dirname, configPath), 'utf8')).tasks;

const scheduler = new Map();

function parseCronExpression(expression) {
  // 解析cron表达式
  // 这里只是一个示例实现，需要根据实际情况进行完善
  const parts = expression.split(' ');
  return {
    minute: parts[0],
    hour: parts[1],
    day: parts[2],
    month: parts[3],
    weekday: parts[4]
  };
}

function scheduleTask(task) {
  const cronOptions = parseCronExpression(task.cron);
  const job = new CronJob(
    {
      minute: cronOptions.minute,
      hour: cronOptions.hour,
      day: cronOptions.day,
      month: cronOptions.month,
      weekday: cronOptions.weekday
    },
    function() {
      console.log(`Running task: ${task.name}`);
      exec_command(task.command);
    },
    true
  );

  scheduler.set(task.name, job);\n}

function addTask(task) {
  scheduleTask(task);
}

function removeTask(name) {
  const job = scheduler.get(name);
  if (job) {
    job.stop();
    scheduler.delete(name);
  }
}

function exec_command(command) {
  require('child_process').exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec_command error: ${error}`);
      console.error(`exec_command stderr: ${stderr}`);
      return;
    }
    console.log(`exec_command stdout: ${stdout}`);
  });
}

// 读取配置文件
read_file({ "file_path": "tasks.json" }).then(content => {
  const config = JSON.parse(content);
  config.tasks.forEach(task => {
    addTask(task);
  });
}).catch(error => {
  console.error("Error reading config file:", error);
});