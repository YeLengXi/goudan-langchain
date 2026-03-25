# 任务18: 代码复杂度分析器

## 目标

创建一个代码复杂度分析工具，可以计算代码的圈复杂度。

## 必须创建的文件

1. `workspace/complexity-analyzer/analyzer.js` - 分析器
2. `workspace/complexity-analyzer/README.md` - 使用文档

## 工作流程

立即执行以下操作：
1. 实现代码解析：
   - 读取JavaScript文件
   - 解析函数
   - 识别控制流语句
2. 实现复杂度计算：
   - 圈复杂度（Cyclomatic Complexity）
   - 认知复杂度（Cognitive Complexity）
   - 维护性指数
3. 实现报告生成：
   - 函数列表
   - 复杂度评分
   - 风险等级
   - 建议优化
4. 实现CLI接口
5. 添加使用示例

## 功能要求

- 解析JavaScript代码
- 计算圈复杂度
- 风险等级评估
- 生成报告
- 支持多文件

## 复杂度计算

```
基础复杂度 = 1

每个控制流语句 +1：
- if/else
- for/while/do-while
- switch/case
- catch
-三元运算符
- 逻辑运算符（&&, ||）
```

## 风险等级

```
1-10: 低风险 ✅
11-20: 中等风险 ⚠️
21-50: 高风险 ❌
50+: 极高风险 🚨
```

## CLI接口

```bash
node analyzer.js file.js
node analyzer.js src/
node analyzer.js --format json
node analyzer.js --output report.txt
```

## 输出示例

```bash
$ node analyzer.js file.js

Code Complexity Report
======================

Function: processData
- Cyclomatic Complexity: 15
- Cognitive Complexity: 12
- Risk Level: ⚠️ MEDIUM
- Lines: 45

Function: validateInput
- Cyclomatic Complexity: 4
- Cognitive Complexity: 2
- Risk Level: ✅ LOW
- Lines: 12

Overall: 2 functions analyzed
1 HIGH risk, 1 LOW risk
```

## 重要

- 使用正则表达式解析
- 包含复杂度说明
- 提供优化建议
- 添加详细注释
- 支持多种输出格式
