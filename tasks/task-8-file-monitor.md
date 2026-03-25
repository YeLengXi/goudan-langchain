# 任务8: 文件监控工具

## 目标

创建一个文件监控工具，可以监控目录变化并在文件修改时执行命令。

## 必须创建的文件

1. `workspace/file-monitor/monitor.js` - 主监控程序
2. `workspace/file-monitor/package.json` - 项目配置

## 工作流程

立即执行以下操作：
1. 使用fs.watch()监控目录
2. 检测文件变化（创建、修改、删除）
3. 执行预定义的命令：
   - 文件创建：执行创建命令
   - 文件修改：执行更新命令
   - 文件删除：执行删除命令
4. 支持配置文件（JSON格式）

## 功能要求

- 实时监控目录变化
- 支持多种事件类型
- 可配置的命令执行
- 日志记录
- 优雅退出（Ctrl+C）

## 配置文件示例

```json
{
  "watchDir": "./watch",
  "events": {
    "create": "echo 'Created: {file}'",
    "modify": "echo 'Modified: {file}'",
    "delete": "echo 'Deleted: {file}'"
  }
}
```

## CLI接口

```bash
node monitor.js --config config.json
```

## 重要

- 使用Node.js fs模块
- 包含错误处理
- 添加使用示例
- 提供详细注释
