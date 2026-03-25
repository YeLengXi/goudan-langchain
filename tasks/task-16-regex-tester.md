# 任务16: 正则表达式测试器

## 目标

创建一个正则表达式测试和调试工具。

## 必须创建的文件

1. `workspace/regex-tester/tester.js` - 测试器主程序
2. `workspace/regex-tester/README.md` - 使用文档
3. `workspace/regex-tester/test.html` - 可视化界面（可选）

## 工作流程

立即执行以下操作：
1. 实现正则表达式测试：
   - 匹配测试
   - 捕获组提取
   - 替换功能
   - 分割功能
2. 实现调试功能：
   - 高亮匹配结果
   - 显示捕获组
   - 错误提示
3. 实现常用正则库：
   - 邮箱验证
   - 手机号验证
   - URL验证
   - IP地址验证
   - 日期格式
4. 实现CLI接口
5. 添加使用示例

## 功能要求

- 测试正则表达式
- 显示匹配结果
- 提取捕获组
- 正则替换
- 常用正则库
- 错误处理

## CLI接口

```bash
node tester.js "/\d+/" --text "hello 123 world"
node tester.js --email "test@example.com"
node tester.js --phone "13800138000"
node tester.js --url "https://example.com"
node tester.js replace "/\s+/g" --text "hello   world" --with "+"
```

## 输出示例

```bash
$ node tester.js "/\d+/" --text "hello 123 world"
Pattern: /\d+/
Text: hello 123 world
Match: 123
Position: 6-9

$ node tester.js --email "test@example.com"
Pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$]
Input: test@example.com
Valid: ✅ true
```

## 重要

- 包含常用正则库
- 添加正则语法说明
- 提供测试用例
- 包含错误提示
- 添加详细注释
