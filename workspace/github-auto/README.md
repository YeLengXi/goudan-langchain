# GitHub 自动化工具

这是一个用于自动化 GitHub 仓库创建、初始化和推送流程的工具。

## 安装

```bash
npm install -g github-auto
```

## 使用

### 创建仓库

```bash
github-auto create <仓库名> --public
github-auto create <仓库名> --private --description "描述"
```

### 初始化项目

```bash
github-auto init --template <模板>
```

### 推送到 GitHub

```bash
github-auto push
```

## 注意

- 需要 GitHub Personal Access Token
- 使用前请确保已安装 Node.js
