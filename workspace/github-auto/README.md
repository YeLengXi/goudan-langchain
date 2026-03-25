# GitHub 自动化工具

这是一个自动化 GitHub 仓库创建、初始化和推送流程的工具。

## 功能

- 仓库创建
- 本地初始化
- 推送到 GitHub
- 模板系统

## 使用方法

- 创建仓库: `github-auto create <仓库名> --public` 或 `github-auto create <仓库名> --private --description <描述>`
- 初始化: `github-auto init --template <模板>`
- 推送: `github-auto push`

## 注意

- 需要 GitHub Personal Access Token
- 错误处理和提示
- 支持配置文件