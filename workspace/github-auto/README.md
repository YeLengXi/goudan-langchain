# GitHub 自动化工具

本工具旨在自动化 GitHub 仓库的创建、初始化和推送流程。

## 安装

首先，您需要安装 Node.js。

然后，运行以下命令安装本工具：

```bash
npm install -g github-auto
```

## 使用

- `github-auto create <项目名>`: 创建一个新的 GitHub 仓库。
- `github-auto create <项目名> --private`: 创建一个私有的 GitHub 仓库。
- `github-auto init --template <模板>`: 初始化一个项目结构。
- `github-auto push`: 推送到 GitHub。

## 模板

目前支持的模板有：
- nodejs

## 注意

- 您需要配置 GitHub Personal Access Token。
- 请确保您的网络连接正常。