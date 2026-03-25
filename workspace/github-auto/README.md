# GitHub 自动化工具

本工具旨在自动化 GitHub 仓库的创建、初始化和推送流程。

## 功能

- 创建 GitHub 仓库
- 初始化本地仓库
- 推送到 GitHub

## 使用方法

```bash
npm install
npm run create [repo-name] -- [options]
npm run init -- [template]
npm run push
```

## 选项

- --public: 创建公开仓库
- --private: 创建私有仓库
- --description: 仓库描述
- --template: 仓库模板

## 示例

```bash
npm run create my-repo --public
npm run init --template nodejs
npm run push
```