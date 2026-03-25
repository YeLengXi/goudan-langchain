# Markdown文档生成器

本工具用于从代码注释自动生成API文档。

## 功能

- 解析JavaScript/JSDoc注释
- 提取函数签名
- 生成API文档表格
- 生成目录
- 支持代码示例

## 使用方法

1. 将代码文件和本工具放在同一目录下。
2. 运行 `node generator.js input.js -o output.md` 命令，其中 `input.js` 是包含注释的代码文件，`output.md` 是生成的Markdown文件。

## 注意

- 确保代码文件中包含JSDoc注释。
- 本工具支持自定义模板，请参考 `template.md` 文件。

