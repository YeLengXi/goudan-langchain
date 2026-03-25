const cron = require('cron');
const fs = require('fs');
const path = require('path');

const taskDirectory = path.join(__dirname, 'tasks');
const tasks = {};

// 解析cron表达式
function parseCronExpression(expression) {
  const parts = expression.split(' ');
  const cronTime = new cron.CronTime(parts.join(' '));
  return cronTime;
}

// 执行任务
function executeTask(taskName) {
  const task = tasks[taskName];
  if (!task) {
    console.error(`Task ${taskName} not found`);
    return;
  }
  try {
    require('child_process').exec(task.command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Execution failed: ${error}`);
        return;
      }
      console.log(`${taskName} executed successfully`);
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }
      if (stdout) {
        console.log(`Stdout: ${stdout}`);
      }
    });
  } catch (error) {
    console.error(`Error executing task ${taskName}: ${error}`);
  }
}

// 添加任务
function addTask(task) {
  const cronTime = parseCronExpression(task.cron);
  cronTime.on('tick', () => {
    executeTask(task.name);
  });
  tasks[task.name] = task;
}

// 删除任务
function deleteTask(taskName) {
  const cronTime = tasks[taskName] ? parseCronExpression(tasks[taskName].cron) : null;
  if (cronTime) {
    cronTime.stop();
  }
  delete tasks[taskName];
}

// 读取配置文件
function readConfig(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading config file: ${err}`);
      return;
    }
    const config = JSON.parse(data);
    config.tasks.forEach(task => {
      addTask(task);
    });
  });
}

// 导出函数
module.exports = { addTask, deleteTask, readConfig };