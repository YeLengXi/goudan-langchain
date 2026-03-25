## 使用说明

本工具可以自动从JavaScript代码注释中生成Markdown格式的API文档。

### 功能特性
- 解析JSDoc注释
- 提取函数签名
- 生成API文档表格
- 生成目录
- 支持代码示例

### 使用方法

1. 将JavaScript代码文件与本工具放在同一目录下。
2. 运行命令 `node generator.js input.js -o output.md`，其中 `input.js` 是包含注释的JavaScript代码文件，`output.md` 是生成的Markdown文档文件。

### 示例

```bash
node generator.js input.js -o docs/api.md
```
