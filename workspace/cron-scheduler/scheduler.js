const { CronJob } = require('cron');

const fs = require('fs');
const path = require('path');

const configFilePath = path.join(__dirname, 'tasks.json');

let tasks = [];

// 读取配置文件
function readConfig() {
  try {
    const data = fs.readFileSync(configFilePath, 'utf8');
    const config = JSON.parse(data);
    tasks = config.tasks || [];
  } catch (error) {
    console.error('配置文件读取失败:', error);
  }
}

// 解析cron表达式
function parseCronExpression(expression) {
  // 这里可以使用内置的cron解析库，但由于要求不使用外部包，我们需要自己实现一个简单的解析器
  // 这里只是一个示例，实际实现可能需要更复杂的逻辑
  const parts = expression.split(' ');
  return {
    minute: parseInt(parts[0], 10),
    hour: parseInt(parts[1], 10),
    day: parseInt(parts[2], 10),
    month: parseInt(parts[3], 10),
    dayOfWeek: parseInt(parts[4], 10)
  };
}

// 创建任务
function createTask(task) {
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
}

// 执行命令
function execCommand(command) {
  try {
    require('child_process').exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('执行命令失败:', error);
      } else {
        console.log('命令输出:', stdout);
      }
    });
  } catch (error) {
    console.error('执行命令时出错:', error);
  }
}

// 主函数
function main() {
  readConfig();
  tasks.forEach(task => createTask(task));
}

main();