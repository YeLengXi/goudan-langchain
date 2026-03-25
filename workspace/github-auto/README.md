# GitHub 自动化工具

这是一个用于自动化 GitHub 仓库创建、初始化和推送流程的工具。

## 安装

首先，确保你已经安装了 Node.js 和 npm。

```bash
npm install
```

## 使用

- 创建仓库：
  ```bash
  github-auto create my-project --public
  ```

- 初始化仓库：
  ```bash
  github-auto init --template nodejs
  ```

- 推送到 GitHub：
  ```bash
  github-auto push
  ```

## 配置

- 修改配置文件（config.json）以设置 GitHub Personal Access Token。

## 注意

- 需要 GitHub Personal Access Token。
- 确保你的项目结构正确。
