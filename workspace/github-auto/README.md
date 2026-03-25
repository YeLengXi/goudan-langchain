# GitHub 自动化工具

这是一个用于自动化 GitHub 仓库创建、初始化和推送的工具。

## 安装

```bash
npm install
```

## 使用

### 创建仓库

```bash
github-auto create my-project --public
```

创建一个公开的仓库：

```bash
github-auto create my-project --private --description "My awesome project"
```

创建一个私有的仓库并添加描述：

### 初始化

```bash
github-auto init --template nodejs
```

初始化一个 Node.js 项目：

### 推送

```bash
github-auto push
```

将本地仓库推送到 GitHub：

## 注意

- 需要配置 GitHub Access Token。
- 确保已安装 git。
