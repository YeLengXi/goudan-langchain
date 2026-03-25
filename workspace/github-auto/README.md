# GitHub 自动化工具

本工具旨在自动化 GitHub 仓库的创建、初始化和推送流程。

## 安装

```bash
npm install
```

## 使用

### 创建仓库

```bash
github-auto create <仓库名> --public
github-auto create <仓库名> --private --description <描述>
```

### 初始化仓库

```bash
github-auto init --template <模板>
```

### 推送仓库

```bash
github-auto push
```
