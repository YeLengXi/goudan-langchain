# GitHub 自动化工具

这是一个用于自动化 GitHub 仓库创建、初始化和推送流程的工具。

## 安装

```bash
npm install
```

## 使用

- 创建仓库:
  ```bash
  github-auto create <username> <repoName> [isPublic]
  ```

  - 初始化项目:
    ```bash
    github-auto init [template]
    ```

  - 推送代码:
    ```bash
    github-auto push
    ```

## 选项

- --public: 创建公开仓库
- --private: 创建私有仓库
- --description: 仓库描述
- --template: 项目模板

## 示例

创建公开仓库:
```bash
github-auto create myusername myrepo --public
```