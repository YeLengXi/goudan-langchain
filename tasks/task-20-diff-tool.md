# 任务20: 文件差异对比工具

## 目标

创建一个文件差异对比工具（类似git diff），可以比较两个文件或目录的差异。

## 必须创建的文件

1. `workspace/diff-tool/diff.js` - diff工具主程序
2. `workspace/diff-tool/README.md` - 使用文档

## 工作流程

立即执行以下操作：
1. 实现文件比较：
   - 逐行比较
   - 识别新增行
   - 识别删除行
   - 识别修改行
2. 实现diff格式：
   - Unified diff（统一格式）
   - Context diff（上下文格式）
   - Side-by-side diff（并排格式）
3. 实现目录比较：
   - 递归遍历
   - 识别新增/删除/修改的文件
4. 实现颜色输出
5. 实现CLI接口
6. 添加使用示例

## 功能要求

- 文件比较
- 目录比较
- 多种输出格式
- 颜色高亮
- 统计信息

## CLI接口

```bash
node diff.js file1.txt file2.txt
node diff.js dir1/ dir2/
node diff.js file1.txt file2.txt --format unified
node diff.js dir1/ dir2/ --format side-by-side
node diff.js --color file1.txt file2.txt
```

## 输出示例

```bash
$ node diff.js old.txt new.txt

--- old.txt
+++ new.txt
@@ -1,3 +1,3 @@
-Hello World
+Hello World!
 This is a test
-Bye bye
+See you soon

Changes: 2 additions, 2 deletions
```

## 重要

- 使用Node.js内置模块
- 支持大文件
- 包含统计信息
- 添加详细注释
- 提供完整示例
