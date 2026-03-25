# 📊 Log Analyzer - 强大的日志分析工具

一个功能完整的 Node.js 日志分析工具，支持多种日志格式、错误统计、搜索和导出功能。

## ✨ 功能

### 🔍 日志解析
- **应用日志** - 解析带时间戳和日志级别的应用日志
- **访问日志** - 支持 Apache/Nginx 访问日志格式
- **错误日志** - 解析堆栈跟踪和错误信息

### 📈 错误统计
- 统计错误总数
- 按错误类型分组
- 显示最频繁的错误

### 🔎 搜索功能
- 按关键词搜索
- 按时间范围过滤
- 按日志级别过滤（INFO、ERROR、WARN）

### 📤 导出功能
- 导出为 JSON 格式
- 导出为 CSV 格式
- 生成统计报告

## 🚀 使用方法

### 基本用法

```bash
# 解析日志文件
node log-analyzer.cjs app.log

# 统计错误
node log-analyzer.cjs app.log --error

# 搜索关键词
node log-analyzer.cjs app.log --search "timeout"

# 导出为 JSON
node log-analyzer.cjs app.log --export json

# 导出为 CSV
node log-analyzer.cjs app.log --export csv
```

### 示例日志格式

**应用日志 (app.log)**:
```
2024-03-25 10:23:45 INFO Application started
2024-03-25 10:23:46 ERROR Failed to connect to database
2024-03-25 10:23:47 DEBUG Loading configuration file
```

**访问日志 (access.log)**:
```
127.0.0.1 - - [25/Mar/2024:10:23:45 +0000] "GET /index.html HTTP/1.1" 200 612
127.0.0.1 - - [25/Mar/2024:10:23:46 +0000] "POST /login HTTP/1.1" 401 323
```

## 📦 模块说明

### log-analyzer.cjs
主程序，提供日志解析和 CLI 接口。

### 错误统计器.cjs
错误统计模块，统计和分组错误信息。

### 搜索引擎.cjs
搜索和过滤模块，支持关键词搜索和多条件过滤。

### 报告生成器.cjs
报告生成模块，支持导出为 JSON 和 CSV 格式。

## 💻 代码示例

```javascript
const { analyzeLog } = require('./log-analyzer');

// 分析日志
const logs = await analyzeLog('app.log');
console.log(`找到 ${logs.length} 条日志`);

// 使用错误统计
const { countErrors } = require('./log-analyzer/错误统计器');
const errors = countErrors(logs);
console.log('错误统计:', errors);

// 搜索日志
const { searchLogs } = require('./log-analyzer/搜索引擎');
const filtered = searchLogs(logs, ['timeout', 'error']);
console.log(`找到 ${filtered.length} 条匹配`);
```

## 🎯 特性

- ✅ 零依赖（只使用 Node.js 内置模块）
- ✅ 支持多种日志格式
- ✅ 快速解析大文件
- ✅ 灵活的搜索和过滤
- ✅ 多种导出格式
- ✅ 易于扩展

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**Made by goudan AI Agent** 🐕
