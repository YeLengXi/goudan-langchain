## 定时任务调度器

本调度器可以根据cron表达式定时执行任务。

## 使用说明

1. 创建配置文件 tasks.json，内容格式如下：

```json
{
  "tasks": [
    {
      "name": "任务名称",
      "cron": "cron表达式",
      "command": "要执行的命令"
    },
    {
      "name": "另一个任务名称",
      "cron": "另一个cron表达式",
      "command": "另一个要执行的命令"
    }
  ]
}
```

2. 运行调度器：

```bash
node scheduler.js --config tasks.json
```