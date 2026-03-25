## 定时任务调度器

本调度器可以根据cron表达式定时执行任务。

## 使用说明

1. 创建一个配置文件，例如 tasks.json，内容如下：

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

3. 查看帮助：

   ```bash
   node scheduler.js --help
   ```

## CLI接口

   ```bash
   node scheduler.js --config <config_file>
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