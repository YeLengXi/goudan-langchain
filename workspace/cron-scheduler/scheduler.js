# scheduler.js

这是一个简单的定时任务调度器，它使用Node.js编写。

## 功能

- 解析cron表达式
- 定时执行任务
- 支持多个任务
- 任务执行历史
- 错误处理和重试

## 使用

```bash
node scheduler.js --config tasks.json
```

## 配置文件

配置文件是一个JSON文件，包含任务的定义。以下是一个示例配置文件：

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