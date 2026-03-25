# 🐕 goudan 快速参考指南

## 🚀 一键启动

### 启动 goudan
```bash
# 双击运行
start-goudan.bat

# 或命令行
cd E:\goudan-langchain
node index.js
```

### 启动监控器
```bash
# 双击运行
monitor-goudan.bat

# 或 PowerShell
powershell -ExecutionPolicy Bypass -File monitor-goudan.ps1
```

### 查看状态
```bash
# 双击运行
goudan-status.bat
```

---

## 📋 当前任务队列

1. **任务1**: 改进代码格式化器
2. **任务2**: 创建日志分析器 ✅ (已完成)
3. **任务3**: 个人作品集网站生成器
4. **任务4**: REST API 测试客户端
5. **任务5**: GitHub 仓库自动化工具

---

## 🔧 管理工具

### 创建 GitHub 仓库
```bash
create-github-repo.bat
```

### 清理桌面
```bash
cleanup-desktop.bat
```

---

## 📁 重要目录

```
E:/goudan-langchain/
├── index.js                 # 主程序
├── start-goudan.bat         # 启动脚本
├── monitor-goudan.ps1       # 监控器
├── goudan-status.bat        # 状态面板
├── tasks/                   # 任务队列
│   └── template.md          # 任务模板
├── workspace/               # 生成的工具
└── logs/                    # 日志文件
```

---

## 💰 收入设置

### 1. 创建 GitHub 仓库
```bash
# 访问
https://github.com/new

# 创建仓库
名称: goudan-langchain
描述: goudan - AI Developer Agent
可见性: Public
```

### 2. 推送代码
```bash
cd E:\goudan-langchain
git remote add origin https://github.com/YeLengXi/goudan-langchain.git
git branch -M main
git push -u origin main
```

### 3. 启用 GitHub Sponsors
访问: https://github.com/sponsors

---

## 📊 监控 goudan

### 实时监控
- **日志文件**: `E:\goudan-langchain\logs\goudan.log`
- **监控器**: `monitor-goudan.ps1` (带通知)
- **状态面板**: `goudan-status.bat`

### 查看最新活动
```bash
# Windows
tail -f E:\goudan-langchain\logs\goudan.log

# PowerShell
Get-Content E:\goudan-langchain\logs\goudan.log -Wait -Tail 20
```

---

## ➕ 添加新任务

### 方式1: 创建任务文件
```bash
cd E:\goudan-langchain\tasks
copy template.md task-6-new-task.md
# 编辑 task-6-new-task.md
```

### 方式2: 使用状态面板
```bash
goudan-status.bat
# 选择 4. 添加新任务
```

### 方式3: GitHub Issues
访问仓库 Issues 页面，创建任务请求。

---

## 🎯 goudan 工作流程

```
1. 加载任务队列 (tasks/)
   ↓
2. 使用 AI 分析任务
   ↓
3. 调用工具 (read_file, write_file, exec_command)
   ↓
4. 多轮对话直到完成 (最多10轮)
   ↓
5. 自动提交到 git
   ↓
6. 推送到 GitHub
   ↓
7. 等待 10 分钟
   ↓
8. 重复步骤 1-7
```

---

## 💡 提示

- goudan 会**每 10 分钟**检查一次新任务
- 完成的工具会**自动提交并推送**
- 监控器会发送**Windows 通知**
- 所有操作都记录在**日志文件**

---

## 🆘 故障排除

### goudan 未运行
```bash
# 检查进程
tasklist | findstr node.exe

# 重启
start-goudan.bat
```

### API 错误
检查 `.env` 文件中的 API 密钥是否正确。

### Git 推送失败
1. 确认已在 GitHub 创建仓库
2. 检查网络连接
3. 验证远程仓库 URL

---

## 📞 支持

- **Email**: 77037708@qq.com
- **GitHub**: https://github.com/YeLengXi/goudan-langchain

---

**祝你赚钱愉快！** 💰🚀
