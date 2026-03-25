# GitHub 自动化工具

本工具旨在自动化 GitHub 仓库的创建、初始化和推送流程。

## 安装

首先，您需要安装本工具。

```bash
npm install -g github-auto
```

## 使用

### 创建仓库

```bash
github-auto create my-project --public
```

```bash
github-auto create my-project --private --description "My awesome project"
```

### 初始化本地项目

```bash
github-auto init --template nodejs
```

### 推送到 GitHub

```bash
github-auto push
```

## 注意

- 您需要设置 GitHub Personal Access Token。
- 确保您的项目已经初始化了 git。
