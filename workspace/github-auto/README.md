# GitHub 自动化工具

本工具旨在自动化 GitHub 仓库的创建、初始化和推送流程。

## 安装

```bash
npm install -g github-auto
```

## 使用

### 创建仓库

```bash
github-auto create my-project --public
```

创建一个公开的仓库。使用 --private 选项创建私有仓库。

### 初始化项目

```bash
github-auto init --template nodejs
```

使用指定模板初始化新项目。

### 推送到 GitHub

```bash
github-auto push
```

将当前项目推送到 GitHub。

## 注意

- 需要 GitHub Personal Access Token
- 确保已安装 git
