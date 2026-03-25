## GitHub 自动化工具

这个工具可以帮助你自动化 GitHub 仓库的创建、初始化和推送流程。

### 安装

首先，你需要安装这个工具：

```bash
npm install -g github-auto
```

### 使用

- 创建仓库：

  ```bash
  github-auto create my-project --public
  ```

  创建私有仓库：

  ```bash
  github-auto create my-project --private --description "My awesome project"
  ```

- 初始化仓库：

  ```bash
  github-auto init --template nodejs
  ```

- 推送仓库：

  ```bash
  github-auto push
  ```

### 注意

- 需要 GitHub Personal Access Token
- 确保你已经配置了 GitHub 账户的 Personal Access Token
- 在执行命令时，请确保替换 `YOUR_GITHUB_TOKEN` 和 `YOUR_USERNAME` 为你的 GitHub 账户信息