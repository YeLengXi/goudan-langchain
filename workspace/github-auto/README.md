# GitHub 自动化工具

这是一个用于自动化 GitHub 仓库创建、初始化和推送流程的工具。

## 安装

首先，您需要安装 Node.js。

然后，运行以下命令来安装依赖项：

```bash
npm install
```

## 使用

- `github-auto create <仓库名> --public` - 创建公开仓库
- `github-auto create <仓库名> --private` - 创建私有仓库
- `github-auto init --template <模板名>` - 初始化项目
- `github-auto push` - 推送到 GitHub

## 模板

目前支持的模板有：
- nodejs

## 注意

- 您需要配置 GitHub Personal Access Token。
