## 使用说明

本工具可以将JavaScript代码中的JSDoc注释自动转换为Markdown格式的API文档。

### 功能

- 解析JSDoc注释
- 提取函数签名
- 生成API文档表格
- 生成目录
- 支持代码示例

### 使用方法

```bash
node generator.js input.js -o docs/api.md
```

### 参数说明

- `input.js`: 输入的JavaScript文件路径
- `-o`: 输出文件路径

### 注意事项

- 确保输入文件包含有效的JSDoc注释
- 输出文件将包含Markdown格式的API文档
