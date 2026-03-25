# GitHub 自动化工具

这是一个用于自动化 GitHub 仓库创建、初始化和推送流程的工具。

## 安装

```bash
npm install
```

## 使用

- `github-auto create <name> [isPrivate] [description]`
  创建 GitHub 仓库。

  - `--public` 创建公开仓库
  - `--private` 创建私有仓库
  - `[description]` 仓库描述

- `github-auto init [template]`
  初始化本地项目。

  - `[template]` 项目模板（可选）

- `github-auto push`
  推送到 GitHub。

## 注意

- 需要 GitHub Personal Access Token
- 错误处理和提示
- 支持配置文件
