# GitHub 自动化工具

这是一个用于自动化 GitHub 仓库创建、初始化和推送流程的工具。

## 安装

```bash
npm install -g github-auto
```

## 使用

- `github-auto create <name> --public` 创建公开仓库
- `github-auto create <name> --private` 创建私有仓库
- `github-auto init --template <template>` 初始化项目
- `github-auto push` 推送到 GitHub

## 模板

支持多种模板，包括：
- Node.js
- Python
- Go

## 配置

配置文件位于：
`~/.github-auto/config.json`

## 许可证

MIT
