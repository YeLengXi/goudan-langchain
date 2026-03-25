# 正则表达式测试器

这是一个简单的正则表达式测试和调试工具。

## 安装

首先，确保你已经安装了Node.js。

然后，将此工具克隆到你的本地目录：
cd your-local-directory

git clone https://github.com/your-username/regex-tester.git

进入工具目录：
cd regex-tester

安装依赖：
npm install

## 使用

运行以下命令来测试正则表达式：

```bash
node tester.js <command> <args>
```

支持的命令包括：

- match
- capture
- replace
- split
- email
- phone
- url
- ip
- date

例如：

```bash
node tester.js match /\d+/ --text "hello 123 world"
```

## 常用正则库

- 邮箱验证
- 手机号验证
- URL验证
- IP地址验证
- 日期格式
