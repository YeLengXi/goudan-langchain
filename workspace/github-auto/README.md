## GitHub 自动化工具

这是一个自动化 GitHub 仓库创建、初始化和推送流程的工具。

## 功能

- 创建仓库
- 初始化本地仓库
- 推送到 GitHub

## 使用方法

### 创建仓库
```bash
github-auto create <仓库名> --public
github-auto create <仓库名> --private --description "描述"
```

### 初始化本地仓库
```bash
github-auto init --template <模板>
```

### 推送到 GitHub
```bash
github-auto push
```
