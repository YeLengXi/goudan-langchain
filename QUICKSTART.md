# 🚀 goudan 快速开始指南

## 第一步：上传到 GitHub

### 1. 在 GitHub 创建仓库

访问：https://github.com/new

- **仓库名称**: `goudan-langchain`
- **描述**: `🐕 goudan - AI Developer Agent，自主工作赚钱养活自己！`
- **可见性**: ✅ Public（公开）
- **不要**勾选 "Add a README file"
- 点击 **Create repository**

### 2. 推送代码

**⚠️ 替换下面的 `YOUR_USERNAME` 为你的 GitHub 用户名**

```bash
cd E:/goudan-langchain
git remote add origin https://github.com/YOUR_USERNAME/goudan-langchain.git
git branch -M main
git push -u origin main
```

## 第二步：启动 goudan

### Windows 用户

双击运行：`start-goudan.bat`

或者命令行：

```bash
cd E:/goudan-langchain
npm start
```

### Linux/Mac 用户

```bash
cd /path/to/goudan-langchain
node index.js
```

## 第三步：观察 goudan 工作

goudan 会：

1. 🔍 自动加载任务队列
2. 🤖 使用 AI 完成任务
3. 📝 创建代码和文件
4. ✅ 自动提交到 git
5. 💰 统计收入
6. 🔄 10分钟后检查新任务

## 第四步：设置 GitHub Sponsors（赚钱）

### 1. 启用 GitHub Sponsors

访问：https://github.com/sponsors

点击 "Become a sponsored developer"

### 2. 编辑赞助链接

修改 `.github/FUNDING.yml`：

```yaml
github:
  - YOUR_USERNAME  # 替换为你的用户名

patreon:
  - YOUR_PATREON_USERNAME  # 如果有的话

custom:
  - https://www.paypal.com/donate?hosted_button_id=XXXXX
```

### 3. 在 README 中添加赞助徽章

```markdown
[![GitHub Sponsors](https://img.shields.io/github/sponsors/YOUR_USERNAME)](https://github.com/sponsors/YOUR_USERNAME)
```

## 第五步：让 goudan 更有活干

### 方式1：添加新任务

在 `tasks/` 目录创建新的 `.md` 文件：

```markdown
# 任务X: 任务标题

## 目标
任务描述

## 必须创建的文件
1. 文件路径1
2. 文件路径2

## 工作流程
1. 步骤1
2. 步骤2

## 重要
- 直接创建文件
- 确保代码可运行
```

### 方式2：提交 GitHub Issue

访问仓库的 Issues 页面，点击 "New Issue"，选择 "🎯 任务请求" 模板。

### 方式3：直接在任务目录添加文件

```bash
cd E:/goudan-langchain/tasks
echo "# 新任务" > task-6-new-task.md
```

## 监控 goudan 的工作

### 查看日志

```bash
tail -f E:/goudan-langchain/logs/goudan.log
```

### 查看生成的工具

```bash
cd E:/goudan-langchain/workspace
ls -la
```

### 查看 git 历史

```bash
cd E:/goudan-langchain/workspace
git log --oneline
```

## 预期收入

### 成本

- 智谱AI API: ¥2-20/月（约100个任务）

### 收入来源

- GitHub Sponsors: $10-100/月
- Patreon: $20-100/月
- 付费工具: $50-200/月
- 技术写作: $30-100/月

### 净利润

**月净收入**: $110-500 (¥750-3500)
**年净收入**: $1,300-6,000 (¥9,000-42,000)

## 常见问题

### Q: goudan 会停止吗？
A: goudan 会持续运行，每10分钟检查一次新任务。

### Q: 如何停止 goudan？
A: 按 `Ctrl+C` 或关闭命令行窗口。

### Q: goudan 能赚钱吗？
A: 可以！通过 GitHub Sponsors、Patreon 等方式接受赞助。

### Q: 如何添加更多任务？
A: 在 `tasks/` 目录添加新的 `.md` 文件即可。

### Q: goudan 会用多少 API？
A: 每个任务约 0.1-1 元人民币，月成本约 2-20 元。

## 支持

- 📧 Email: 77037708@qq.com
- 🐛 Issues: https://github.com/YOUR_USERNAME/goudan-langchain/issues
- 💬 Discussions: https://github.com/YOUR_USERNAME/goudan-langchain/discussions

---

**祝你赚钱愉快！** 💰🚀
