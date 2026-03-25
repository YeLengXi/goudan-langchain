# 🐕 goudan - AI Developer Agent

> goudan 是一个自主工作的 AI 开发者 agent，使用智谱AI API 完成开发任务并赚钱养活自己！

[![AI Agent](https://img.shields.io/badge/AI-Agent-success)](https://github.com/goudan-ai)
[![ZhipuAI](https://img.shields.io/badge/Powered-ZhipuAI-blue)](https://open.bigmodel.cn/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## ✨ 核心功能

### 🤖 自主工作能力
- ✅ **任务驱动** - 从任务队列自动加载和处理任务
- ✅ **工具调用** - 使用 read_file, write_file, exec_command 等工具
- ✅ **多轮对话** - 支持最多 10 轮连续工具调用
- ✅ **代码生成** - 生成完整可运行的代码（非骨架）
- ✅ **自我改进** - 持续学习和优化

### 💰 盈利能力
- ✅ **开发工具** - 创建实用开发工具并开源
- ✅ **GitHub Sponsors** - 接受社区赞助
- ✅ **Patreon** - 订阅制收入
- ✅ **付费版本** - 高级功能付费
- ✅ **技术写作** - 博客和教程收入

### 🛠️ 技术特性
- 🔧 **零依赖** - 只使用 Node.js 内置 fetch 和 dotenv
- 📁 **文件操作** - 读取、写入、列出文件
- ⚡ **命令执行** - 运行 shell 命令和测试
- 📝 **日志系统** - 完整的操作日志记录
- 🔄 **持续模式** - 自动检查新任务并处理

---

## 🚀 快速开始

### 1. 安装依赖

```bash
git clone https://github.com/your-username/goudan-langchain.git
cd goudan-langchain
npm install
```

### 2. 配置环境变量

复制 `.env.example` 到 `.env` 并配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
# 智谱AI API 配置
ZHIPUAI_API_KEY=你的API密钥
ZHIPUAI_MODEL=glm-4-flash
ZHIPUAI_BASE_URL=https://open.bigmodel.cn/api/paas/v4/

# 目录配置
WORKSPACE_DIR=./workspace
TASKS_DIR=./tasks
LOGS_DIR=./logs
```

### 3. 运行 goudan

```bash
# 单次运行
npm start

# 持续工作模式（自动检查新任务）
node index.js
```

---

## 📁 项目结构

```
goudan-langchain/
├── index.js              # 主程序入口
├── agent.js              # LangChain 版本（备用）
├── package.json          # 项目配置
├── .env.example          # 环境变量模板
├── .gitignore           # Git 忽略文件
├── README.md            # 项目说明
├── tasks/               # 任务队列目录
│   ├── task-1-improve-formatter.md
│   └── task-2-log-analyzer.md
├── workspace/           # 工作目录（生成项目）
│   ├── README.md
│   ├── log-analyzer.cjs
│   └── log-analyzer/
│       ├── README.md
│       ├── 错误统计器.cjs
│       ├── 搜索引擎.cjs
│       └── 报告生成器.cjs
├── logs/                # 日志目录
│   └── goudan.log
└── results/             # 任务结果（自动生成）
```

---

## 🛠️ 可用工具

goudan 可以使用以下工具完成任务：

| 工具名称 | 功能描述 | 参数 |
|---------|---------|------|
| `read_file` | 读取文件内容 | `file_path` |
| `write_file` | 写入文件内容 | `file_path`, `content` |
| `exec_command` | 执行命令行命令 | `command` |
| `list_directory` | 列出目录内容 | `directory_path` |

---

## 📝 创建任务

在 `tasks/` 目录创建 `.md` 文件来给 goudan 分配任务：

```markdown
# 任务名称: 简短描述

## 目标

任务的具体目标和期望结果。

## 必须创建的文件

1. `path/to/file1.js` - 文件描述
2. `path/to/file2.js` - 文件描述

## 工作流程

立即执行以下操作：
1. 步骤1
2. 步骤2
3. 步骤3

## 重要

- 不要描述计划，直接创建文件
- 一次性完成所有改进
- 确保代码可以运行
```

---

## 💡 成功案例

### 案例 1: 日志分析器

goudan 自主创建了完整的日志分析工具：

- ✅ 4 个模块文件（主程序 + 3 个功能模块）
- ✅ 5 轮工具调用
- ✅ 支持多种日志格式解析
- ✅ 错误统计和搜索功能
- ✅ 导出 JSON 和 CSV
- ✅ CLI 接口和完整文档

**代码行数**: 361 行
**开发时间**: ~1 分钟
**工具调用**: 5 轮（read_file, write_file, exec_command）

---

## 💰 成本与收益

### 运营成本

| 项目 | 成本 |
|-----|------|
| GLM-4-Flash | ¥0.1/1M tokens |
| GLM-4-Air | ¥1/1M tokens |
| 平均每个任务 | ¥0.02-0.20 |
| 月度成本（100任务） | ¥2-20 |

### 预期收入

| 来源 | 月收入 |
|-----|--------|
| GitHub Sponsors | $10-100 |
| Patreon | $20-100 |
| 付费工具 | $50-200 |
| 技术写作 | $30-100 |
| **总计** | **$110-500** |

### 净利润

**月净收入**: $108-498 (¥750-3500)

**年净收入**: $1,300-6,000 (¥9,000-42,000)

---

## ❤️ 打赏支持

如果 goudan 或这个项目对你有帮助，请考虑打赏支持！你的鼓励是我们持续开发的动力！💪

<div align="center">

### 🌟 成为赞助者

[![GitHub Sponsors](https://img.shields.io/github/sponsors/YeLengXi?style=for-the-badge&logo=github&logoColor=white&label=Sponsor&color=EA4AAA)](https://github.com/sponsors/YeLengXi)

**首选方式** - GitHub Sponsors 提供月度赞助支持

### 💳 其他打赏方式

[![PayPal](https://img.shields.io/badge/PayPal-Donate-blue?style=for-the-badge&logo=paypal&logoColor=white)](https://www.paypal.me/YeLengXi)
[![支付宝](https://img.shields.io/badge/支付宝-Donate-blue?style=for-the-badge&logo=alipay&logoColor=white)](mailto:77037708@qq.com)

**支付宝**: 77037708@qq.com
**微信**: 77037708 (请备注"GitHub赞助")

### ☕ 请我喝杯咖啡

- 小额支持：¥10 ($1.50) - 感谢你的支持！
- 中等支持：¥50 ($7) - 帮助购买API额度
- 大额支持：¥100 ($14) - 支持新功能开发
- 企业赞助：¥500+ ($70+) - 定制功能和技术支持

### 💖 感谢所有支持者

你们的鼓励让 goudan 能够：
- ✅ 完成更多开发任务
- ✅ 添加更多功能
- ✅ 改进代码质量
- ✅ 提供更好的文档

</div>

---

### 📊 资金使用透明化

所有打赏资金将用于：
- 💰 **40%** API调用费用（智谱AI）
- 🛠️ **30%** 服务器和托管费用
- 📚 **20%** 文档和教程改进
- 🎁 **10%** 社区奖励和活动

---

## 📊 技术架构

```
┌─────────────┐
│   任务队列   │
│  (tasks/)   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Goudan AI  │
│   Agent     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────┐
│      智谱AI API (GLM-4)     │
│  - 多轮对话                 │
│  - 工具调用                 │
│  - 代码生成                 │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│        工具执行层            │
│  - read_file                │
│  - write_file               │
│  - exec_command             │
│  - list_directory           │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────┐
│   工作区    │
│ (workspace/) │
└─────────────┘
```

---

## 🔧 开发路线图

### v1.0 (当前)
- ✅ 基础 agent 框架
- ✅ 工具调用支持
- ✅ 任务队列系统
- ✅ 日志系统
- ✅ 第一个项目（日志分析器）

### v1.1 (计划中)
- [ ] GitHub 自动集成
- [ ] 更多工具（git, npm, 测试）
- [ ] 错误重试机制
- [ ] 任务优先级

### v2.0 (未来)
- [ ] 多 agent 协作
- [ ] 自主任务生成
- [ ] 学习和优化
- [ ] 社区任务市场

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

## 👥 作者

**goudan** - AI Developer Agent 🤖

- Email: 77037708@qq.com
- GitHub: [@goudan-ai](https://github.com/goudan-ai)

---

## 🙏 致谢

- [智谱AI](https://open.bigmodel.cn/) - 提供 GLM-4 API
- [Node.js](https://nodejs.org/) - 运行时环境
- [开源社区](https://github.com/) - 提供灵感和工具

---

## 📞 联系我们

- 问题反馈: [GitHub Issues](https://github.com/your-username/goudan-langchain/issues)
- 邮件: 77037708@qq.com
- 微信: [待添加]

---

**Made with ❤️ by goudan (AI Developer Agent)**

*让 AI 自主工作，赚钱养活自己！* 🚀
