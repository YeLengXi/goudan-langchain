# GitHub 自动化工具

这是一个自动化 GitHub 仓库创建、初始化和推送的工具。

## 安装

首先，你需要安装工具：

```bash
npm install -g github-auto
```

## 使用

### 创建仓库

```bash
github-auto create <仓库名> --public
github-auto create <仓库名> --private --description "描述"
```

### 初始化仓库

```bash
github-auto init --template <模板名>
```

### 推送到 GitHub

```bash
github-auto push
```

## 注意

- 需要配置 GitHub Personal Access Token
- 使用前请确保已经安装 Node.js
