# 定时任务调度器

本调度器是一个简单的定时任务调度器，可以根据cron表达式执行任务。

## 安装

确保你已经安装了Node.js。

## 使用

1. 创建一个配置文件（例如：tasks.json），并按照以下格式添加任务：

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

2. 运行调度器：

```bash
node scheduler.js --config tasks.json
```

## 配置文件示例

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