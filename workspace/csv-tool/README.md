# CSV数据处理工具

这是一个CSV数据处理工具，可以读取、解析、转换和导出CSV文件。

## 安装

```bash
npm install
```

## 使用

### 转换格式

```bash
node csv-tool.js convert input.csv --format json
```

### 过滤

```bash
node csv-tool.js filter input.csv --column "status" --value "active"
```

### 排序

```bash
node csv-tool.js sort input.csv --column "date"
```

### 转换为表格

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
