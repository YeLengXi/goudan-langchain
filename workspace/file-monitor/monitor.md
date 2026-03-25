# 监控工具

监控指定目录下的文件变化，并在变化时执行相应的命令。

## 使用方法

```bash
node monitor.js --config config.json
```

## 配置文件示例

```json
{
  "watchDir": "./watch",
  "events": {
    "create": "echo 'Created: {file}'",
    "modify": "echo 'Modified: {file}'",
    "delete": "echo 'Deleted: {file}'
  }
}
```