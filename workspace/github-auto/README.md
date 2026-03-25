# GitHub 自动化工具

本工具旨在自动化 GitHub 仓库的创建、初始化和推送流程。

## 安装

```bash
npm install -g github-auto
```

## 使用

- `github-auto create <仓库名> --public` 创建公开仓库
- `github-auto create <仓库名> --private` 创建私有仓库
- `github-auto init --template <模板名>` 初始化仓库
- `github-auto push` 推送到 GitHub

## 模板

目前支持的模板有：
- nodejs
- python

## 注意

- 需要 GitHub 账户和 Personal Access Token
- 请确保已安装 Node.js 和 npm
