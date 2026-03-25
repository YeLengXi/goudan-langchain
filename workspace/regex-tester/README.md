# 正则表达式测试器

这是一个用于测试和调试正则表达式的工具。

## 安装

首先，确保你已经安装了 Node.js。

然后，将此工具克隆到你的本地环境中：

```bash
 git clone https://github.com/your-username/regex-tester.git
 cd regex-tester
 npm install
 ```

## 使用

运行以下命令来测试正则表达式：

```bash
 node tester.js "/\d+\/" --text "hello 123 world"
```

你可以使用以下选项来测试不同的功能：

- `--text <text>`: 要测试的文本
- `--email <email>`: 验证邮箱
- `--phone <phone>`: 验证手机号
- `--url <url>`: 验证 URL
- `--ip <ip>`: 验证 IP 地址
- `--date <date>`: 验证日期格式
- `--replace <regex>`: 替换文本
- `--with <replacement>`: 替换为的文本

## 示例

```bash
# 测试匹配
 node tester.js "/\d+\/" --text "hello 123 world"

# 验证邮箱
 node tester.js --email "test@example.com"

# 验证手机号
 node tester.js --phone "13800138000"

# 验证 URL
 node tester.js --url "https://example.com"

# 验证 IP 地址
 node tester.js --ip "192.168.1.1"

# 验证日期格式
 node tester.js --date "2021-12-31"

# 替换文本
 node tester.js replace "/\s+/g" --text "hello   world" --with "+"

```