# 任务9: 定时任务调度器

## 目标

创建一个简单的定时任务调度器，可以按照cron表达式执行任务。

## 必须创建的文件

1. `workspace/cron-scheduler/scheduler.js` - 调度器主程序
2. `workspace/cron-scheduler/README.md` - 使用说明

## 工作流程

立即执行以下操作：
1. 实现cron表达式解析：
   - 支持标准cron格式：分 时 日 月 周
   - 示例："0 9 * * *" = 每天9点
   - 示例："*/5 * * * *" = 每5分钟
2. 创建任务调度系统
3. 支持添加/删除任务
4. 任务执行日志
5. 配置文件支持

## 功能要求

- 解析cron表达式
- 定时执行任务
- 支持多个任务
- 任务执行历史
- 错误处理和重试

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

## 重要

- 使用Node.js内置模块
- 实现完整的cron解析
- 包含测试用例
- 提供使用示例
