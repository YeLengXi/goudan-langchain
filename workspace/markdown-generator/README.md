# Markdown文档生成器

这是一个从代码注释自动生成API文档的Markdown文档生成器。

## 安装

确保你已经安装了Node.js。

## 使用方法

1. 将代码文件和此生成器放在同一目录下。
2. 运行以下命令：

    ```bash
    node generator.js input.js -o docs/api.md
    ```
3. 生成器将读取`input.js`文件，并生成API文档到`docs/api.md`。

## 参数

- `-o` 或 `--output`：指定输出文件路径。

## 示例

```javascript
// input.js

/**
 * 计算两个数的和
 * @param {number} a - 第一个数
 * @param {number} b - 第二个数
 * @returns {number} 两数之和
 */
function add(a, b) {
  return a + b;
}

// generator.js

// 生成Markdown文档
