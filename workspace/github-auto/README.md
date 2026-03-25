# GitHub 自动化工具

这是一个用于自动化 GitHub 仓库创建、初始化和推送流程的工具。

## 安装

首先，你需要安装工具：

```bash
npm install
```

## 使用

- `github-auto create <仓库名> --public` 创建公开仓库
- `github-auto create <仓库名> --private` 创建私有仓库
- `github-auto init --template <模板名>` 初始化项目
- `github-auto push` 推送到 GitHub

## 模板

目前支持的模板有：
- nodejs

## 注意

- 需要 GitHub Personal Access Token
- 错误处理和提示
- 支持配置文件
