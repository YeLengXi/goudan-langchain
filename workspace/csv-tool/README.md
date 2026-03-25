/*
# CSV数据处理工具

一个用于读取、解析、转换和导出CSV文件的Node.js工具。

## 安装

```bash
npm install csv-tool
```

## 使用示例

```bash
# 转换CSV到JSON
node csv-tool.js convert input.csv --format json

# 过滤CSV文件中的行
node csv-tool.js filter input.csv --column "status" --value "active"

# 排序CSV文件
node csv-tool.js sort input.csv --column "date"

# 将CSV转换为Markdown表格
node csv-tool.js to-table input.csv --format markdown

```

## 功能

- 读取CSV文件
- 解析复杂CSV（引号、转义）
- 转换多种格式
- 数据过滤和排序
- 导出功能
- 错误处理

*/