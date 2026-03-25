## json-tools

一个用于处理JSON数据的命令行工具。

## 功能

- 格式化JSON
- 排序JSON
- 过滤JSON
- 合并JSON

## 使用说明

### 格式化JSON

```bash
node json-tools.js format input.json
```

### 排序JSON

```bash
node json-tools.js sort input.json --key name
```

### 过滤JSON

```bash
node json-tools.js filter input.json --condition "age > 18"
```

## 安装

```bash
npm install json-tools
```
