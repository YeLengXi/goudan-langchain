# github-auto

一个用于自动化创建、初始化和推送 GitHub 仓库的工具。

## 安装

首先，您需要安装此工具：

```bash
npm install -g github-auto
```

## 使用

### 创建仓库

```bash
github-auto create <仓库名> --public
github-auto create <仓库名> --private --description "描述"
```

### 初始化

```bash
github-auto init --template <模板名>
```

### 推送

```bash
github-auto push
```