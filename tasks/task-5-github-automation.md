# 任务5: 创建 GitHub 仓库自动化工具

## 目标

创建一个工具自动化 GitHub 仓库的创建、初始化和推送流程。

## 必须创建的文件

1. `E:/goudan-langchain/workspace/github-auto/package.json` - 项目配置
2. `E:/goudan-langchain/workspace/github-auto/index.js` - 主程序
3. `E:/goudan-langchain/workspace/github-auto/templates/README.md` - README 模板
4. `E:/goudan-langchain/workspace/github-auto/README.md` - 使用文档

## 功能要求

### 1. 仓库创建
- 通过 GitHub API 创建仓库
- 支持公开/私有仓库
- 自动初始化 README
- 添加 .gitignore 和 LICENSE

### 2. 本地初始化
- 自动初始化 git
- 创建项目结构
- 添加初始文件
- 第一次提交

### 3. 推送到 GitHub
- 添加 remote
- 推送到 main 分支
- 设置默认分支

### 4. 模板系统
- README 模板
- 多种 .gitignore 模板
- LICENSE 选择（MIT, Apache, GPL）

## CLI 接口

```bash
github-auto create my-project --public
github-auto create my-project --private --description "My awesome project"
github-auto init --template nodejs
github-auto push
```

## 工作流程

立即执行以下操作：
1. 创建项目结构
2. 实现 GitHub API 调用
3. 实现 CLI 命令
4. 实现模板系统
5. 创建文档和示例

## 重要

- 需要 GitHub Personal Access Token
- 错误处理和提示
- 支持配置文件
- 确保代码可以运行

## 预期结果

- 完整的 GitHub 自动化工具
- 一键创建仓库
- 节省开发者时间
- 易于使用的 CLI
