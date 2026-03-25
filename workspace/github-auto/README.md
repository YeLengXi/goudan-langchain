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

创建一个公开的仓库。

```bash
github-auto create my-project --private --description "My awesome project"
```

创建一个私有的仓库，并添加描述。

### 初始化本地仓库

```bash
github-auto init --template nodejs
```

使用 Node.js 模板初始化本地仓库。

### 推送到 GitHub

```bash
github-auto push
```

将本地仓库推送到 GitHub。

## 注意

- 需要 GitHub Personal Access Token
- 确保已安装 git 和 npm
