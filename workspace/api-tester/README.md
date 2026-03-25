# api-tester

## 简介
api-tester 是一个简单的 REST API 测试工具，可以帮助开发者快速测试 REST API。

## 安装

```bash
npm install -g api-tester
```

## 使用

```bash
api-tester GET https://api.example.com/users
api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'
api-tester --request-file requests.json
```

## 选项

- `GET`, `POST`, `PUT`, `DELETE`, `PATCH`: HTTP 方法
- `-d`: 请求体
- `--request-file`: 请求文件

## 示例

```json
{"method":"GET","url":"https://api.example.com/users","headers":{},"body":null}
```