# GitHub 自动化工具

本工具旨在自动化 GitHub 仓库的创建、初始化和推送流程。

## 安装

```bash
npm install
```

## 使用

- `github-auto create <repo-name> --public` - 创建公开仓库
- `github-auto create <repo-name> --private` - 创建私有仓库
- `github-auto init --template <template>` - 初始化仓库
- `github-auto push` - 推送到 GitHub

## 配置

- `githubToken`: GitHub Personal Access Token
- `repoName`: 仓库名称
- `repoDescription`: 仓库描述
- `repoVisibility`: 仓库可见性（public/private）
- `repoLicense`: 仓库许可证（MIT/Apache/GPL）
- `repoTemplate`: 仓库模板（README.md/.gitignore/LICENSE）

## 示例

```bash
github-auto create my-repo --public
```