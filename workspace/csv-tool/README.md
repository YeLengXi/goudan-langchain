# CSV数据处理工具

这是一个用于读取、解析、转换和导出CSV文件的Node.js工具。

## 安装

首先，确保你已经安装了Node.js。

然后，将此工具克隆到你的本地环境中。

```bash
npm install
```

## 使用

### 转换CSV格式

```bash
node csv-tool.js convert input.csv --format json
```

将CSV文件转换为JSON格式。

### 过滤CSV文件

```bash
node csv-tool.js filter input.csv --column "status" --value "active"
```

按列过滤CSV文件。

### 排序CSV文件

```bash
node csv-tool.js sort input.csv --column "date"
```

按列排序CSV文件。

### 将CSV转换为表格

```bash
node csv-tool.js to-table input.csv --format markdown
```

将CSV转换为Markdown表格。

## 示例

```javascript
const csv = require('csv-tool');

// 读取CSV文件
const csvData = fs.readFileSync('input.csv', 'utf8');

// 转换为JSON
const jsonData = csv.csvToJson(csvData);

// 过滤CSV
const filteredCsv = csv.filterCSV(csvData, 'status', 'active');

// 排序CSV
const sortedCsv = csv.sortCSV(csvData, 'date', 'asc');

// 将CSV转换为Markdown表格
const markdownTable = csv.csvToMarkdown(csvData);

// 将CSV转换为HTML表格
const htmlTable = csv.csvToHTML(csvData);
```