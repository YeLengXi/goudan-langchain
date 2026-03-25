# GitHub 自动化工具

这是一个用于自动化 GitHub 仓库创建、初始化和推送流程的工具。

## 安装

```bash
npm install
```

## 使用

- `github-auto create <name> [description] --public` - 创建公开仓库
- `github-auto create <name> [description] --private` - 创建私有仓库
- `github-auto init [template]` - 初始化本地项目
- `github-auto push` - 推送到 GitHub

## 示例

```bash
# 创建公开仓库
github-auto create my-project

# 创建私有仓库
github-auto create my-project --private

# 初始化本地项目
github-auto init nodejs

# 推送到 GitHub
github-auto push
```