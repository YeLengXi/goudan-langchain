# github-auto

一个用于自动化 GitHub 仓库创建、初始化和推送的工具。

## 安装

```bash
npm install -g github-auto
```

## 使用

### 创建仓库

```bash
github-auto create <仓库名> --[public|private] [--description <描述>]
```

#### 参数

- `<仓库名>`: 仓库名称
- `--public`: 创建公开仓库
- `--private`: 创建私有仓库
- `--description`: 仓库描述

### 初始化

```bash
github-auto init --template <模板>
```

#### 参数

- `<模板>`: 初始化模板，如 nodejs

### 推送

```bash
github-auto push
```

## 注意

- 需要 GitHub 账户和 Personal Access Token
