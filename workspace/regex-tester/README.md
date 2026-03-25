# 正则表达式测试器

这是一个用于测试和调试正则表达式的工具。

## 功能

- 测试正则表达式
- 显示匹配结果
- 提取捕获组
- 正则替换
- 常用正则库
- 错误处理

## 使用方法

### CLI接口

```bash
node tester.js "/\d+/" --text "hello 123 world"
node tester.js --email "test@example.com"
node tester.js --phone "13800138000"
node tester.js --url "https://example.com"
node tester.js replace "/\s+/g" --text "hello\ \ world" --with "+"
```

### 输出示例

```bash
$ node tester.js "/\d+/" --text "hello 123 world"
Pattern: /\d+/
Text: hello 123 world
Match: 123
Position: 6-9

$ node tester.js --email "test@example.com"
Pattern: /^[\^\s@]+@[\^\s@]+\.[\^\s@]+$/
Input: test@example.com
Valid: ✅ true
```