# 定时任务调度器

本调度器可以按照cron表达式执行任务。

## 安装

确保你已经安装了Node.js。

## 使用方法

1. 创建一个配置文件，例如 `tasks.json`。
2. 运行 `node scheduler.js --config tasks.json`。

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