## JSON数据处理工具

本工具提供JSON数据的格式化、排序、过滤和合并功能。

## 使用方法

### 格式化JSON

`node json-tools.js format input.json`

将JSON文件格式化输出。

### 排序JSON

`node json-tools.js sort input.json --key name`

按指定键值对JSON进行排序。

### 过滤JSON

`node json-tools.js filter input.json --condition "age > 18"`

根据条件过滤JSON数据。

## 示例

格式化：

```bash
node json-tools.js format input.json
```

排序：

```bash
node json-tools.js sort input.json --key name
```

过滤：

```bash
node json-tools.js filter input.json --condition "age > 18"
```