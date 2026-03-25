# CSV数据处理工具

这是一个CSV数据处理工具，可以读取、解析、转换和导出CSV文件。

## 安装

确保你已经安装了Node.js。

## 使用

### 转换CSV格式

将CSV文件转换为JSON、Markdown表格或HTML表格。

```bash
node csv-tool.js convert input.csv --format json
node csv-tool.js convert input.csv --format markdown
node csv-tool.js convert input.csv --format html
```

### 过滤CSV文件

按列和值过滤CSV文件。

```bash
node csv-tool.js filter input.csv --column "status" --value "active"
```

### 排序CSV文件

按列排序CSV文件。

```bash
node csv-tool.js sort input.csv --column "date"
```

### 将CSV转换为表格

将CSV文件转换为Markdown表格或HTML表格。

```bash
node csv-tool.js to-table input.csv --format markdown
node csv-tool.js to-table input.csv --format html
```
