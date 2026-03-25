# CSV数据处理工具

这是一个用于读取、解析、转换和导出CSV文件的命令行工具。

## 安装

首先，确保你已经安装了Node.js。

然后，在命令行中运行以下命令来安装csv-tool:

```bash
npm install csv-tool
```

## 使用

以下是一些使用csv-tool的示例。

### 转换CSV到JSON

```bash
node csv-tool.js convert input.csv --format json
```

### 过滤CSV

```bash
node csv-tool.js filter input.csv --column "status" --value "active"
```

### 排序CSV

```bash
node csv-tool.js sort input.csv --column "date"
```

### 将CSV转换为Markdown表格

```bash
node csv-tool.js to-table input.csv --format markdown
```
