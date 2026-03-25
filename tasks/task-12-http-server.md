# 任务12: 简单HTTP服务器

## 目标

创建一个轻量级的HTTP静态文件服务器，可以快速启动和托管文件。

## 必须创建的文件

1. `workspace/http-server/server.js` - 服务器主程序
2. `workspace/http-server/README.md` - 使用说明
3. `workspace/http-server/package.json` - 项目配置

## 工作流程

立即执行以下操作：
1. 实现HTTP服务器（使用http模块）
2. 支持静态文件服务
3. 支持目录浏览
4. 实现MIME类型检测
5. 添加CORS支持
6. 实现CLI启动命令
7. 添加日志功能

## 功能要求

- 指定端口和根目录
- 支持目录索引
- MIME类型自动检测
- CORS支持
- 请求日志
- 错误处理（404、500等）
- 优雅关闭

## CLI接口

```bash
node server.js --port 8080 --dir ./public
node server.js --port 3000 --dir ./dist
```

## 启动示例

```
Starting HTTP server...
- Port: 8080
- Root: ./public
- URL: http://localhost:8080
Press Ctrl+C to stop
```

## 重要

- 使用Node.js http/https模块
- 支持常用文件类型（html, css, js, json, images）
- 包含错误处理
- 添加使用示例
