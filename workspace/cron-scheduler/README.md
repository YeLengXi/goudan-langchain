## 定时任务调度器

这是一个简单的定时任务调度器，可以按照cron表达式执行任务。

## 安装

确保已安装Node.js。

## 使用

1. 创建一个配置文件（例如：tasks.json）。
2. 运行命令：`node scheduler.js --config tasks.json`

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

## CLI接口

```bash
node scheduler.js --config tasks.json
```