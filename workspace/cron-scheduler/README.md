# 定时任务调度器

这是一个简单的定时任务调度器，可以按照cron表达式执行任务。

## 安装

确保你已经安装了Node.js。

## 使用方法

1. 创建一个配置文件（例如：tasks.json）：

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

- `tasks`: 一个任务数组，每个任务包含以下字段：
  - `name`: 任务的名称
  - `cron`: cron表达式
  - `command`: 要执行的命令

## CLI接口

- `--config`: 指定配置文件的路径
