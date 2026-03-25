# github-auto

一个用于自动化 GitHub 仓库创建、初始化和推送的工具。

## 安装

npm install

## 使用

- `github-auto create <仓库名> --public` 创建公开仓库
- `github-auto create <仓库名> --private` 创建私有仓库
- `github-auto init --template <模板名>` 初始化仓库
- `github-auto push` 推送到 GitHub

## 模板

目前支持的模板有：
- nodejs
- python

## 注意

- 需要 GitHub 账号和 Personal Access Token
- 使用前请确保已安装 git
