# Markdown文档生成器

本工具可以从代码注释自动生成API文档。

## 功能

- 解析JavaScript/JSDoc注释
- 提取函数签名
- 生成API文档表格
- 生成目录
- 支持代码示例

## 使用方法

1. 将代码文件与generator.js放在同一目录下。
2. 运行命令：node generator.js input.js -o output.md

## 参数

-o, --output <file>
输出文件路径

## 示例

```bash
node generator.js input.js -o docs/api.md
```