# GitHub 自动化工具

这是一个用于自动化 GitHub 仓库创建、初始化和推送流程的工具。

## 安装

```bash
npm install -g github-auto
```

## 使用

### 创建仓库

```bash
github-auto create my-project --public
```

创建一个公开的仓库，仓库名为 my-project。

```bash
github-auto create my-project --private --description "My awesome project"
```

创建一个私有的仓库，仓库名为 my-project，并添加描述。

### 初始化本地项目

```bash
github-auto init --template nodejs
```

使用 nodejs 模板初始化本地项目。

### 推送到 GitHub

```bash
github-auto push
```

将本地项目推送到 GitHub。
