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
github-auto create <仓库名> --public
github-auto create <仓库名> --private --description "描述"
```

### 初始化本地仓库

```bash
github-auto init --template <模板名>
```

### 推送到 GitHub

```bash
github-auto push
```

## 注意

- 您需要有一个 GitHub 账号和 Personal Access Token。
- 在创建仓库时，请确保您有足够的权限。
