# CSV数据处理工具

这是一个用于读取、解析、转换和导出CSV文件的工具。

## 安装

首先，确保你已经安装了Node.js。

然后，将以下命令添加到你的终端或命令提示符中：

```bash
npm install
```

## 使用

- 转换CSV格式：

```bash
node csv-tool.js convert input.csv --format json
```

- 过滤CSV：

```bash
node csv-tool.js filter input.csv --column "status" --value "active"
```

- 排序CSV：

```bash
node csv-tool.js sort input.csv --column "date"
```

- 将CSV转换为Markdown表格：

```bash
node csv-tool.js to-table input.csv --format markdown
```

## 示例

以下是几个使用该工具的示例：

- 将CSV转换为JSON格式：

```bash
node csv-tool.js convert input.csv --format json
```

- 过滤状态为'active'的行：

```bash
node csv-tool.js filter input.csv --column "status" --value "active"
```

- 按日期排序CSV：

```bash
node csv-tool.js sort input.csv --column "date"
```

- 将CSV转换为Markdown表格：

```bash
node csv-tool.js to-table input.csv --format markdown
```
