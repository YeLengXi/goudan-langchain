# GitHub 自动化工具

该工具可以帮助你自动化创建、初始化和推送 GitHub 仓库。

## 安装

npm install -g github-auto

## 使用

### 创建仓库

github-auto create <仓库名> --public

github-auto create <仓库名> --private --description <描述>

### 初始化仓库

github-auto init --template <模板>

### 推送到 GitHub

github-auto push