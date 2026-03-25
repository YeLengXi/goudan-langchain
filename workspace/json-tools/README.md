# JSON 数据处理工具

这是一个JSON数据处理工具，可以格式化、排序、过滤JSON数据。

## 功能

- 格式化：美化JSON输出
- 排序：按字母或数值排序
- 过滤：支持条件表达式
- 合并：深度合并对象

## 使用方法

```bash
node json-tools.js format input.json
node json-tools.js sort input.json --key name
node json-tools.js filter input.json --condition "age > 18"
node json-tools.js merge input.json input2.json
```