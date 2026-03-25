# GitHub 自动化工具

本工具旨在自动化 GitHub 仓库的创建、初始化和推送流程。

## 功能

- 创建 GitHub 仓库
- 初始化本地项目
- 推送到 GitHub

## 使用方法

### 创建仓库
```bash
github-auto create <仓库名> --public
github-auto create <仓库名> --private --description "描述"
```

### 初始化本地项目
```bash
github-auto init --template <模板>
```

### 推送到 GitHub
```bash
github-auto push
```

## 配置

- GitHub Personal Access Token
