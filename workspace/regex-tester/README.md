# 正则表达式测试器

## 目标
创建一个正则表达式测试和调试工具。

## 使用方法

### 安装

```bash
npm install regex-tester
```

### 使用

```bash
regex-tester 
```

### 参数

- --text: 需要测试的文本
- --pattern: 正则表达式模式
- --replace: 替换文本
- --with: 替换为的文本
- --email: 测试邮箱格式
- --phone: 测试手机号格式
- --url: 测试URL格式
- --ip: 测试IP地址格式
- --date: 测试日期格式

### 示例

```bash
regex-tester "/\d+/" --text "hello 123 world"
regex-tester --email "test@example.com"
regex-tester --phone "13800138000"
regex-tester --url "https://example.com"
regex-tester replace "/\s+/g" --text "hello   world" --with "+"
```