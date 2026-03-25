## JSON数据处理工具

本工具提供JSON数据的格式化、排序、过滤和合并功能。

### 安装

1. 下载并解压工具包。
2. 在终端中运行以下命令安装Node.js：
   npm install

### 使用方法

- 格式化JSON：
  node json-tools.js format input.json
- 排序JSON：
  node json-tools.js sort input.json --key name
- 过滤JSON：
  node json-tools.js filter input.json --condition "age > 18"

### 示例

- 格式化JSON：
  node json-tools.js format example.json
- 排序JSON：
  node json-tools.js sort example.json --key name
- 过滤JSON：
  node json-tools.js filter example.json --condition "age > 18"
