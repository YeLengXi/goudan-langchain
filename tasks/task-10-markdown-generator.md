# 任务10: Markdown文档生成器

## 目标

创建一个Markdown文档生成器，可以从代码注释自动生成API文档。

## 必须创建的文件

1. `workspace/markdown-generator/generator.js` - 主生成器
2. `workspace/markdown-generator/README.md` - 使用说明
3. `workspace/markdown-generator/template.md` - 文档模板

## 工作流程

立即执行以下操作：
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

## 输出示例

```markdown
# API文档

## add(a, b)

计算两个数的和

**参数**:
- `a` (number) - 第一个数
- `b` (number) - 第二个数

**返回值**: (number) 两数之和
```

## CLI接口

```bash
node generator.js input.js -o docs/api.md
```

## 重要

- 使用正则表达式解析注释
- 支持JSDoc格式
- 生成结构化文档
- 包含错误处理
- 提供详细注释
