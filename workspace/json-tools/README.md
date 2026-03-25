## JSON 数据处理工具

本工具提供格式化、排序、过滤和合并 JSON 数据的功能。

### 使用方法

1. 格式化 JSON
   - `node json-tools.js format input.json`

2. 排序 JSON
   - `node json-tools.js sort input.json --key name`

3. 过滤 JSON
   - `node json-tools.js filter input.json --condition "age > 18"`

### 功能

- 格式化 JSON 输出
- 按键值排序 JSON 数据
- 根据条件过滤 JSON 数据
- 深度合并 JSON 对象
- 错误处理：无效 JSON
