# GitHub 自动化工具

本工具旨在自动化 GitHub 仓库的创建、初始化和推送流程。

## 安装

```bash
npm install -g github-auto
```

## 使用

### 创建仓库

```bash
github-auto create <仓库名> [描述] --public
github-auto create <仓库名> [描述] --private
```

### 初始化本地仓库

```bash
github-auto init [模板] [仓库名]
```

### 推送到 GitHub

```bash
github-auto push
```

## 模板

支持多种模板，包括：
- nodejs
- python
- java

## 配置

可在 package.json 中配置自定义模板和设置。
