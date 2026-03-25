## GitHub 自动化工具

这是一个用于自动化 GitHub 仓库创建、初始化和推送流程的工具。

### 功能

- 仓库创建
  - 通过 GitHub API 创建仓库
  - 支持公开/私有仓库
  - 自动初始化 README
  - 添加 .gitignore 和 LICENSE

- 本地初始化
  - 自动初始化 git
  - 创建项目结构
  - 添加初始文件
  - 第一次提交

- 推送到 GitHub
  - 添加 remote
  - 推送到 main 分支
  - 设置默认分支

- 模板系统
  - README 模板
  - 多种 .gitignore 模板
  - LICENSE 选择（MIT, Apache, GPL）

### 使用方法

```bash
github-auto create my-project --public

github-auto create my-project --private --description "My awesome project"

github-auto init --template nodejs

github-auto push

```