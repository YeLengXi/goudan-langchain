## 定时任务调度器

这是一个简单的定时任务调度器，可以按照cron表达式执行任务。

## 安装

确保你已经安装了Node.js。

## 使用方法

1. 创建一个配置文件（例如：tasks.json）。
2. 在配置文件中定义任务。
3. 运行调度器：
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

## 任务定义

每个任务定义如下：

- name: 任务名称
- cron: cron表达式
- command: 要执行的命令

## CLI接口

```bash
node scheduler.js --config tasks.json
```
