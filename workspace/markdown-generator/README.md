## 使用说明

本工具用于从JavaScript代码注释中自动生成API文档。

### 功能
- 解析JavaScript/JSDoc注释
- 提取函数签名
- 生成API文档表格
- 生成目录
- 支持代码示例

### 使用方法

```bash
node generator.js input.js -o docs/api.md
```

### 参数

- `-o`：输出文件路径

### 示例

```javascript
/**
 * 计算两个数的和
 * @param {number} a - 第一个数
 * @param {number} b - 第二个数
 * @returns {number} 两数之和
 */
function add(a, b) {
  return a + b;
}
```