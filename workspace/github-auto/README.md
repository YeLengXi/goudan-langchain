# GitHub 自动化工具

这是一个自动化 GitHub 仓库创建、初始化和推送流程的工具。

## 功能

- 创建 GitHub 仓库
- 初始化本地仓库
- 推送到 GitHub

## 使用方法

```bash
npm install -g github-auto

# 创建仓库
github-auto create my-project --public
# 创建私有仓库
github-auto create my-project --private --description "My awesome project"
# 初始化仓库
github-auto init --template nodejs
# 推送到 GitHub
github-auto push

```