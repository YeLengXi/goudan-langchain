const cron = require('cron');

// 解析cron表达式
const parseCronExpression = (expression) => {
  const parts = expression.split(' ');
  return {
    minute: parts[0],
    hour: parts[1],
    dayOfMonth: parts[2],
    month: parts[3],
    dayOfWeek: parts[4]
  }
};

// 调度任务
const scheduleTask = (cronExpression, taskFunction) => {
  const cronJob = cron.job(cronExpression, () => {
    taskFunction();
  });
  cronJob.start();
  return cronJob;
}

// 删除任务
scheduleTask.delete = (taskName) => {
  // 这里只是示例，实际删除逻辑需要根据具体需求实现
  console.log(`删除任务: ${taskName}`);
}

module.exports = {
  parseCronExpression,
  scheduleTask
};
