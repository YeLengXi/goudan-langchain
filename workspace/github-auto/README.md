# GitHub 自动化工具

这是一个用于自动化 GitHub 仓库创建、初始化和推送流程的工具。

## 安装

```bash
npm install
```

## 使用

- `github-auto create <name> --public` - 创建公开仓库
- `github-auto create <name> --private --description "描述"` - 创建私有仓库
- `github-auto init --template <template>` - 初始化本地仓库
- `github-auto push` - 推送到 GitHub

## 配置

- GitHub Personal Access Token

## 注意

- 确保你已经安装了 Node.js 和 npm
