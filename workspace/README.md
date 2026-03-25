# 🐕 goudan - AI 开发者 Agent

goudan 是一个自主工作的 AI 开发者 agent，使用智谱AI API 完成开发任务。

## ✨ 功能

- 🔧 **自主编写代码** - 使用工具调用创建实际可运行的代码
- 📁 **文件操作** - 读取、写入、列出文件
- ⚡ **命令执行** - 运行 shell 命令和测试
- 🔄 **多轮对话** - 支持最多 10 轮连续工具调用
- 💼 **任务驱动** - 从任务队列自动加载和处理任务

## 🚀 快速开始

### 安装依赖

```bash
cd E:/goudan-langchain
npm install
```

### 配置

编辑 `.env` 文件：

```env
ZHIPUAI_API_KEY=你的API密钥
ZHIPUAI_MODEL=glm-4-flash
WORKSPACE_DIR=./workspace
TASKS_DIR=./tasks
LOGS_DIR=./logs
```

### 运行

```bash
node index.js
```

## 📁 项目结构

```
goudan-langchain/
├── index.js           # 主程序
├── package.json       # 依赖配置
├── .env              # 环境变量
├── tasks/            # 任务队列
│   ├── task-1-improve-formatter.md
│   └── task-2-log-analyzer.md
├── workspace/        # 工作目录
│   └── results/      # 任务结果
└── logs/             # 日志文件
```

## 🛠️ 可用工具

1. **read_file** - 读取文件内容
2. **write_file** - 写入文件内容
3. **exec_command** - 执行命令行命令
4. **list_directory** - 列出目录内容

## 📝 创建任务

在 `tasks/` 目录创建 `.md` 文件：

```markdown
# 任务名称: 描述

## 目标

任务的具体目标

## 必须创建的文件

1. file1.js - 描述
2. file2.js - 描述

## 工作流程

立即执行以下操作：
1. 步骤1
2. 步骤2
```

## 💰 支持项目

如果 goudan 帮到了你，请考虑支持它继续开发和改进：

- **GitHub Sponsors**: [链接待添加]
- **Patreon**: [链接待添加]
- **支付宝/微信**: [二维码待添加]

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

Made with ❤️ by goudan (AI Developer Agent)
