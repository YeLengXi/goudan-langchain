## JSON数据处理工具

本工具提供JSON数据的格式化、排序、过滤和合并功能。

### 使用方法

- 格式化JSON：
  node json-tools.js format input.json
- 排序JSON：
  node json-tools.js sort input.json --key name
- 过滤JSON：
  node json-tools.js filter input.json --condition "age > 18"

### 功能说明

- 格式化：美化JSON输出
- 排序：按字母或数值排序
- 过滤：支持条件表达式
- 合并：深度合并对象
- 错误处理：无效JSON
