# GitHub 自动化工具

这是一个用于自动化 GitHub 仓库创建、初始化和推送流程的工具。

## 安装

```bash
npm install
```

## 使用

### 创建仓库

```bash
github-auto create my-project --public
```

创建一个名为 my-project 的公开仓库。

```bash
github-auto create my-project --private --description "My awesome project"
```

创建一个名为 my-project 的私有仓库，并添加描述。

### 初始化本地仓库

```bash
github-auto init --template nodejs
```

初始化一个本地仓库，并使用 nodejs 模板。

### 推送到 GitHub

```bash
github-auto push
```

将本地仓库推送到 GitHub。

## 配置

可以在 config.json 文件中配置 GitHub API Token。

## 注意

- 需要 GitHub Personal Access Token。
- 确保已安装 Node.js 和 npm。
