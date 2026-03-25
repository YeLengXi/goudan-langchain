# JSON数据处理工具

本工具用于格式化、排序、过滤和合并JSON数据。

## 使用方法

运行以下命令以使用工具：

```bash
node json-tools.js <command> <options>
```

其中 <command> 是要执行的操作，<options> 是可选的参数。

## 命令

- format: 格式化JSON输出
  - 选项：--indent <number>（缩进级别，默认为4）
- sort: 排序JSON数据
  - 选项：--key <string>（排序键，默认为所有键）
- filter: 过滤JSON数据
  - 选项：--condition <string>（过滤条件，使用JavaScript表达式）
- merge: 合并JSON数据
  - 选项：--file <string>（要合并的JSON文件路径）

## 示例

- 格式化JSON输出：
  ```bash
node json-tools.js format input.json --indent 2
  ```
- 排序JSON数据：
  ```bash
node json-tools.js sort input.json --key name
  ```
- 过滤JSON数据：
  ```bash
node json-tools.js filter input.json --condition "age > 18"
  ```
- 合并JSON数据：
  ```bash
node json-tools.js merge input.json --file merge.json
  ```