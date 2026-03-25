## JSON数据处理工具

本工具提供JSON数据的格式化、排序、过滤和合并功能。

### 安装

确保已安装Node.js。

### 使用方法

运行以下命令以使用工具：

- 格式化JSON：
  node json-tools.js format input.json
- 按键值排序：
  node json-tools.js sort input.json --key name
- 过滤数据：
  node json-tools.js filter input.json --condition "age > 18"

### 示例

- 格式化JSON：
  格式化后的JSON将被输出到控制台。
- 排序：
  根据指定的键值对JSON进行排序。
- 过滤：
  根据指定的条件表达式过滤JSON数据。
