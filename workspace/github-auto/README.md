# GitHub 自动化工具

本工具旨在自动化 GitHub 仓库的创建、初始化和推送流程。

## 安装

```bash
npm install
```

## 使用

### 创建仓库

```bash
github-auto create my-project --public

github-auto create my-project --private --description "My awesome project"
```

### 初始化

```bash
github-auto init --template nodejs
```

### 推送

```bash
github-auto push
```

## 配置

- `YOUR_GITHUB_TOKEN`: 你的 GitHub 个人访问令牌
