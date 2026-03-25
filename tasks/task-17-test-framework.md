# 任务17: 单元测试框架

## 目标

创建一个简单的JavaScript单元测试框架。

## 必须创建的文件

1. `workspace/test-framework/test.js` - 测试框架
2. `workspace/test-framework/assert.js` - 断言库
3. `workspace/test-framework/README.md` - 使用文档
4. `workspace/test-framework/example.test.js` - 测试示例

## 工作流程

立即执行以下操作：
1. 实现测试框架：
   - describe（测试套件）
   - it（测试用例）
   - before/after（钩子）
   - 断言函数
2. 实现断言库：
   - equal
   - deepEqual
   - truthy
   - falsy
   - throws
   - contains
3. 实现报告生成：
   - 测试结果统计
   - 失败信息
   - 彩色输出
4. 实现CLI运行器
5. 添加使用示例

## 功能要求

- 测试组织
- 断言功能
- 异步测试支持
- 错误处理
- 报告生成

## API接口

```javascript
const { describe, it, expect } = require('./test.js');

describe('Math operations', () => {
  it('should add numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('should subtract numbers', () => {
    expect(subtract(5, 2)).toBe(3);
  });
});
```

## CLI接口

```bash
node test.js example.test.js
node test.js tests/
node test.js --verbose
node test.js --watch
```

## 输出示例

```
Math operations
  ✓ should add numbers
  ✓ should subtract numbers

2 tests passed (0 failures)
```

## 重要

- 纯JavaScript实现
- 支持同步和异步测试
- 包含详细错误信息
- 提供完整示例
- 添加详细注释
