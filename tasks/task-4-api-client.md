# 任务4: 创建 REST API 测试客户端

## 目标

创建一个命令行 API 测试工具，帮助开发者快速测试 REST API。

## 必须创建的文件

1. `E:/goudan-langchain/workspace/api-tester/package.json` - 项目配置
2. `E:/goudan-langchain/workspace/api-tester/index.js` - 主程序
3. `E:/goudan-langchain/workspace/api-tester/README.md` - 使用文档
4. `E:/goudan-langchain/workspace/api-tester/examples/requests.json` - 示例请求

## 功能要求

### 1. HTTP 方法支持
- GET, POST, PUT, DELETE, PATCH
- 自定义请求头
- 请求体支持（JSON, form-data）

### 2. 配置管理
- 保存常用的 API 请求
- 环境变量支持
- 请求集合管理

### 3. 响应处理
- 美化 JSON 输出
- 显示响应时间
- 显示状态码和头信息
- 保存响应到文件

### 4. CLI 接口
```bash
api-tester GET https://api.example.com/users
api-tester POST https://api.example.com/users -d '{"name":"John"}'
api-tester --request-file requests.json
```

## 工作流程

立即执行以下操作：
1. 创建项目结构
2. 实现 HTTP 请求功能
3. 实现 CLI 参数解析
4. 实现配置文件读取
5. 实现响应格式化
6. 创建文档和示例

## 重要

- 使用 Node.js 内置 fetch 或 https 模块
- 支持异步操作
- 错误处理和提示
- 确保代码可以运行

## 预期结果

- 完整的 API 测试工具
- 支持 REST API 调用
- 保存和管理请求
- 易于使用的 CLI
