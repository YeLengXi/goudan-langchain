# Markdown文档生成器

## 目标

创建一个Markdown文档生成器，可以从代码注释自动生成API文档。

## 必须创建的文件

1. `generator.js` - 主生成器
2. `README.md` - 使用说明
3. `template.md` - 文档模板

## 工作流程

1. 解析JavaScript/JSDoc注释
2. 提取函数、类、参数信息
3. 生成Markdown格式的API文档
4. 支持自定义模板
5. 生成目录（TOC）

## 功能要求

- 解析JSDoc注释
- 提取函数签名
- 生成API文档表格
- 生成目录
- 支持代码示例

## 输入示例

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