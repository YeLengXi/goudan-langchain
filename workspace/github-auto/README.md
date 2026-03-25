# GitHub 自动化工具

本工具可以帮助你自动化 GitHub 仓库的创建、初始化和推送流程。

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

## 注意

- 需要 GitHub Personal Access Token
- 错误处理和提示
- 支持配置文件
