# 日志分析器

# 功能要求

### 1. 日志解析
- 支持多种日志格式
  - 应用日志（时间戳 + 级别 + 消息）
  - 访问日志（Apache 格式）
  - 错误日志（堆栈跟踪）

### 2. 错误统计
- 统计错误数量
- 按类型分组
- 显示最频繁的错误

### 3. 搜索功能
- 按关键词搜索
- 按时间范围过滤
- 按日志级别过滤

### 4. 导出功能
- 导出为 JSON
- 导出为 CSV
- 生成统计报告

## 文件结构
```
log-analyzer.cjs
├── 日志解析器
├── 错误统计器
├── 搜索引擎
└── 报告生成器
```
## 使用示例
```bash
node log-analyzer.cjs app.log --error --export json
node log-analyzer.cjs app.log --search "timeout" --export csv
```