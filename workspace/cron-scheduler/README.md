## 定时任务调度器

这是一个简单的定时任务调度器，可以按照cron表达式执行任务。

### 功能

- 解析cron表达式
- 定时执行任务
- 支持多个任务
- 任务执行历史
- 错误处理和重试

### 使用说明

1. 创建配置文件 tasks.json
2. 运行命令：node scheduler.js --config tasks.json

### 配置文件示例

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