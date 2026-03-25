# CSV数据处理工具

这是一个CSV数据处理工具，可以读取、解析、转换和导出CSV文件。

## 安装

首先，确保你已经安装了Node.js。

然后，在项目目录下运行以下命令来安装依赖项：

```bash
npm install
```

## 使用

以下是使用该工具的示例：

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

## 功能

- 读取CSV文件
- 解析复杂CSV（引号、转义）
- 转换多种格式
- 数据过滤和排序
- 导出功能
- 错误处理