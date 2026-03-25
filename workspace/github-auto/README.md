# GitHub 自动化工具

本工具可以帮助你自动化 GitHub 仓库的创建、初始化和推送流程。

## 安装

首先，你需要安装本工具。

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

### 初始化本地项目

```bash
github-auto init --template nodejs
```

初始化一个 Node.js 项目。

### 推送到 GitHub

```bash
github-auto push
```

将本地项目推送到 GitHub。

## 注意

- 需要 GitHub Personal Access Token
- 仓库创建、初始化和推送可能需要一些时间
