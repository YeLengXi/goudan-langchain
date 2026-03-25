## JSON数据处理工具

本工具提供JSON数据的格式化、排序、过滤和合并功能。

## 使用说明

### 格式化JSON

`node json-tools.js format input.json`

将input.json文件中的JSON数据格式化输出。

### 排序JSON

`node json-tools.js sort input.json --key name`

按key值对input.json文件中的JSON数据进行排序。

### 过滤JSON

`node json-tools.js filter input.json --condition "age > 18"`

根据条件表达式过滤input.json文件中的JSON数据。

## 示例

```json
{
  "name": "John",
  "age": 25
}
```