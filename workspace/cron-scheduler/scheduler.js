const { parseCronExpression, scheduleTask } = require('./scheduler');

// 读取配置文件
const configPath = process.argv[2] || 'tasks.json';
const config = require(configPath);

// 启动调度器
parseCronExpression(config);
