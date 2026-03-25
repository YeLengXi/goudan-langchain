# GitHub 自动化工具

## 简介
本工具用于自动化 GitHub 仓库的创建、初始化和推送流程。

## 安装

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

### 初始化仓库

```bash
github-auto init --template nodejs
```

### 推送到 GitHub

```bash
github-auto push
```
