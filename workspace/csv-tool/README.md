# CSV数据处理工具

这是一个用于读取、解析、转换和导出CSV文件的Node.js工具。

## 安装

```bash
npm install
```

## 使用方法

- 转换CSV到JSON
  ```bash
node csv-tool.js convert input.csv --format json
  ```

- 过滤CSV文件
  ```bash
node csv-tool.js filter input.csv --column "status" --value "active"
  ```

- 排序CSV文件
  ```bash
node csv-tool.js sort input.csv --column "date"
  ```

- CSV转Markdown表格
  ```bash
node csv-tool.js to-table input.csv --format markdown
  ```

## 示例

```javascript
const fs = require('fs');
const { CSVParser, CSVGenerator } = require('./csv-tool');

const csvData = fs.readFileSync('input.csv', 'utf-8');
const parser = new CSVParser();
const generator = new CSVGenerator();

parser.write(csvData);
parser.pipe(generator);

generator.on('data', (data) => {
  console.log(data);
});

generator.on('end', () => {
  console.log('转换完成');
});
```