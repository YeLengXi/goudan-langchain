# GitHub 自动化工具

这是一个用于自动化 GitHub 仓库创建、初始化和推送过程的工具。

## 安装

```bash
npm install
```

## 使用

- 创建仓库: `github-auto create <仓库名> --public` 或 `github-auto create <仓库名> --private --description <描述>`
- 初始化本地仓库: `github-auto init --template <模板名>`
- 推送到 GitHub: `github-auto push`

## 模板

目前支持的模板有: nodejs

## 注意

- 需要 GitHub Personal Access Token
- 错误处理和提示
- 支持配置文件
