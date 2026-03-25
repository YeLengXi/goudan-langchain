# CSV数据处理工具

这是一个CSV数据处理工具，可以读取、解析、转换和导出CSV文件。

## 安装

首先，确保你已经安装了Node.js。

然后，将此工具克隆到你的本地目录：
cd your-local-directory

git clone https://github.com/your-username/csv-tool.git

进入工具目录：
cd csv-tool

安装依赖：
npm install

## 使用

- 转换CSV格式：
node csv-tool.js convert input.csv --format json

- 过滤CSV：
node csv-tool.js filter input.csv --column "status" --value "active"

- 排序CSV：
node csv-tool.js sort input.csv --column "date"

- 转换CSV到Markdown表格：
node csv-tool.js to-table input.csv --format markdown

## 示例

- 转换CSV到JSON：
```bash
node csv-tool.js convert input.csv --format json
```

- 过滤CSV中的活动状态：
```bash
node csv-tool.js filter input.csv --column "status" --value "active"
```

- 排序CSV中的日期列：
```bash
node csv-tool.js sort input.csv --column "date"
```

- 将CSV转换为Markdown表格：
```bash
node csv-tool.js to-table input.csv --format markdown
```
