# CSV数据处理工具

这是一个Node.js脚本，用于读取、解析、转换和导出CSV文件。

## 安装

确保你已经安装了Node.js和npm。

使用以下命令安装依赖项：

```bash
npm install
```

## 使用

- 转换CSV格式：
  ```bash
  node csv-tool.js convert input.csv --format json
  ```
- 过滤CSV文件：
  ```bash
  node csv-tool.js filter input.csv --column "status" --value "active"
  ```
- 排序CSV文件：
  ```bash
  node csv-tool.js sort input.csv --column "date"
  ```
- 将CSV转换为Markdown表格：
  ```bash
  node csv-tool.js to-table input.csv --format markdown
  ```

## 示例

```javascript
const csv = require('csv-tool');

// 读取CSV文件
const csvData = csv.parseCSV('input.csv');

// 转换为JSON
const jsonData = csv.csvToJson(csvData);

// 过滤数据
const filteredData = csv.filterCSV(csvData, 'status', 'active');

// 排序数据
const sortedData = csv.sortCSV(csvData, 'date');

// 将CSV转换为Markdown表格
const markdownTable = csv.csvToMarkdown(csvData);

// 将CSV转换为HTML表格
const htmlTable = csv.csvToHTML(csvData);

console.log(jsonData);
console.log(filteredData);
console.log(sortedData);
console.log(markdownTable);
console.log(htmlTable);
```