# CSV数据处理工具

本工具是一个用于读取、解析、转换和导出CSV文件的命令行工具。

## 安装

```bash
npm install csv-tool
```

## 使用

### 转换CSV文件

```bash
node csv-tool.js convert input.csv --format json
```

### 过滤CSV文件

```bash
node csv-tool.js filter input.csv --column "status" --value "active"
```

### 排序CSV文件

```bash
node csv-tool.js sort input.csv --column "date"
```

### 将CSV文件转换为表格

```bash
node csv-tool.js to-table input.csv --format markdown
```

## 注意

- 本工具使用Node.js内置模块。
- 支持大文件（流式处理）。
