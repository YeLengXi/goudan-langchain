# 定时任务调度器

这是一个简单的定时任务调度器，可以根据cron表达式执行任务。

## 安装

确保你已经安装了Node.js。

## 使用

1. 创建一个配置文件，例如 `tasks.json`。

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

## 配置文件说明

- `tasks`: 任务列表
- `name`: 任务名称
- `cron`: cron表达式
- `command`: 要执行的命令

## 注意

- cron表达式遵循标准cron格式：分 时 日 月 周
- 示例：
  - "0 9 * * *" = 每天9点
  - "*/5 * * * *" = 每5分钟

