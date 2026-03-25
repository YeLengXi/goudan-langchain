# GitHub 自动化工具

本工具旨在自动化 GitHub 仓库的创建、初始化和推送流程。

## 安装

首先，确保已安装 Node.js。

然后，运行以下命令进行安装：

```bash
npm install
```

## 使用

- `github-auto create <项目名> --public` - 创建公开仓库
- `github-auto create <项目名> --private` - 创建私有仓库
- `github-auto init --template <模板名>` - 初始化项目
- `github-auto push` - 推送到 GitHub

## 配置

配置文件位于 `.github-auto/config.json`。

## 许可

MIT
