欢迎使用cron-scheduler!

本调度器可以按照cron表达式执行任务，支持添加/删除任务、任务执行日志和配置文件支持。

## 使用说明

1. 创建一个配置文件，例如tasks.json，内容如下：

```json
{
  "tasks": [
    {
      "name": "backup",
      "cron": "0 2 * * *",
      "command": "node backup.js"
    },
    {
      "name": "cleanup",
      "cron": "0 */6 * * *",
      "command": "node cleanup.js"
    }
  ]
}
```

2. 运行以下命令启动调度器：

    node scheduler.js --config tasks.json

3. 查看任务执行日志：

    node scheduler.js --log

## CLI接口

- `node scheduler.js --config tasks.json`：启动调度器
- `node scheduler.js --log`：查看任务执行日志
