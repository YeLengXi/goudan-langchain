# API-Tester

## 简介
API-Tester 是一个命令行 API 测试工具，可以帮助开发者快速测试 REST API。

## 安装

```bash
npm install -g api-tester
```

## 使用

### 基本用法
```bash
api-tester GET https://api.example.com/users
```

### 发送 POST 请求
```bash
api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'
```

### 使用请求文件
```bash
api-tester --request-file requests.json
```

## 配置

API-Tester 支持保存常用的 API 请求，并通过环境变量进行配置。

## 示例请求

```json
{
  "method": "GET",
  "url": "https://api.example.com/users"
}
```