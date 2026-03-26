import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import axios from 'axios';
import crypto from 'crypto';

const execAsync = promisify(exec);

// 加载环境变量
dotenv.config();

// 配置
const CONFIG = {
  apiKey: process.env.ZHIPUAI_API_KEY,
  model: process.env.ZHIPUAI_MODEL || 'glm-4-flash',
  baseUrl: process.env.ZHIPUAI_BASE_URL || 'https://open.bigmodel.cn/api/paas/v4/',
  workspaceDir: process.env.WORKSPACE_DIR || './workspace',
  tasksDir: process.env.TASKS_DIR || './tasks',
  logsDir: process.env.LOGS_DIR || './logs',
};

// 日志函数
async function log(message, level = 'info') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;

  console.log(logMessage);

  // 写入日志文件
  const logFile = path.join(CONFIG.logsDir, 'goudan.log');
  try {
    await fs.appendFile(logFile, logMessage);
  } catch (error) {
    // 忽略日志文件写入错误
  }
}

// 工具：读取文件
class ReadFileTool {
  name = 'readFile';
  description = '读取文件内容。输入文件路径。';

  async _call(filePath) {
    try {
      await log(`读取文件: ${filePath}`);
      const content = await fs.readFile(filePath, 'utf-8');
      return content;
    } catch (error) {
      await log(`读取文件失败: ${error.message}`, 'error');
      return `错误: ${error.message}`;
    }
  }
}

// 工具：写入文件
class WriteFileTool {
  name = 'writeFile';
  description = '写入文件内容。输入文件路径和内容（格式：路径|内容）。';

  async _call(input) {
    try {
      const [filePath, ...contentParts] = input.split('|');
      const content = contentParts.join('|');

      await log(`写入文件: ${filePath}`);

      // 确保目录存在
      const dir = path.dirname(filePath);
      await fs.mkdir(dir, { recursive: true });

      await fs.writeFile(filePath, content, 'utf-8');
      return `成功写入文件: ${filePath}`;
    } catch (error) {
      await log(`写入文件失败: ${error.message}`, 'error');
      return `错误: ${error.message}`;
    }
  }
}

// 工具：执行命令
class ExecTool {
  name = 'exec';
  description = '执行命令行命令。输入命令。';

  async _call(command) {
    try {
      await log(`执行命令: ${command}`);
      const { stdout, stderr } = await execAsync(command, {
        cwd: CONFIG.workspaceDir,
        timeout: 30000, // 30秒超时
      });

      if (stderr) {
        await log(`命令stderr: ${stderr}`, 'warn');
      }

      return stdout || `命令执行完成`;
    } catch (error) {
      await log(`命令执行失败: ${error.message}`, 'error');
      return `错误: ${error.message}`;
    }
  }
}

// 工具：列出文件
class ListFilesTool {
  name = 'listFiles';
  description = '列出目录中的文件。输入目录路径。';

  async _call(dirPath) {
    try {
      await log(`列出目录: ${dirPath}`);
      const files = await fs.readdir(dirPath);
      return files.join('\n');
    } catch (error) {
      await log(`列出目录失败: ${error.message}`, 'error');
      return `错误: ${error.message}`;
    }
  }
}

// Goudan Agent
class GoudanAgent {
  constructor() {
    this.tools = {
      readFile: new ReadFileTool(),
      writeFile: new WriteFileTool(),
      exec: new ExecTool(),
      listFiles: new ListFilesTool(),
    };

    this.taskQueue = [];
    this.currentTask = null;
  }

  // 调用智谱AI API
  async callZhipuAI(messages) {
    try {
      const token = await this.generateToken(CONFIG.apiKey);

      const response = await axios.post(
        `${CONFIG.baseUrl}chat/completions`,
        {
          model: CONFIG.model,
          messages: messages.map(msg => ({
            role: msg.constructor.name === 'SystemMessage' ? 'system' : 'user',
            content: msg.content
          }))
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        content: response.data.choices[0].message.content
      };
    } catch (error) {
      await log(`智谱AI调用失败: ${error.message}`, 'error');
      throw error;
    }
  }

  // 生成JWT token（智谱AI要求）
  async generateToken(apiKey) {
    try {
      const [id, secret] = apiKey.split('.');
      const now = Date.now();
      const payload = {
        api_key: id,
        exp: now + 3600 * 1000,
        timestamp: now
      };

      const header = {
        alg: 'HS256',
        sign_type: 'SIGN'
      };

      const headerEncoded = Buffer.from(JSON.stringify(header)).toString('base64url');
      const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString('base64url');

      const signature = crypto
        .createHmac('sha256', secret)
        .update(`${headerEncoded}.${payloadEncoded}`)
        .digest('base64url');

      return `${headerEncoded}.${payloadEncoded}.${signature}`;
    } catch (error) {
      await log(`Token生成失败: ${error.message}`, 'error');
      throw error;
    }
  }

  // 获取可用工具列表
  getToolsList() {
    return Object.values(this.tools).map(tool => ({
      name: tool.name,
      description: tool.description,
    }));
  }

  // 加载任务队列
  async loadTasks() {
    try {
      const files = await fs.readdir(CONFIG.tasksDir);
      const tasks = [];

      for (const file of files) {
        if (file.endsWith('.md')) {
          const content = await fs.readFile(
            path.join(CONFIG.tasksDir, file),
            'utf-8'
          );
          tasks.push({
            id: file.replace('.md', ''),
            file: file,
            content: content,
          });
        }
      }

      this.taskQueue = tasks.sort((a, b) => a.id.localeCompare(b.id));
      await log(`加载了 ${tasks.length} 个任务`);

      return tasks;
    } catch (error) {
      await log(`加载任务失败: ${error.message}`, 'error');
      return [];
    }
  }

  // 执行工具调用
  async executeTool(toolName, toolInput) {
    const tool = this.tools[toolName];
    if (!tool) {
      await log(`工具不存在: ${toolName}`, 'error');
      return `错误: 工具 ${toolName} 不存在`;
    }

    return await tool._call(toolInput);
  }

  // 主循环：处理任务
  async run() {
    await log('='.repeat(60));
    await log('Goudan 启动！准备开始工作...');
    await log('='.repeat(60));

    // 加载任务
    await this.loadTasks();

    if (this.taskQueue.length === 0) {
      await log('没有找到任务，等待中...', 'warn');
      return;
    }

    // 处理每个任务
    for (const task of this.taskQueue) {
      await log('');
      await log(`🎯 开始任务: ${task.id}`);
      await log('-'.repeat(40));

      this.currentTask = task;

      // 使用 AI 处理任务
      const result = await this.processTask(task);

      await log(`✅ 任务完成: ${task.id}`);
      await log(`结果: ${result.substring(0, 200)}...`);
      await log('');

      // 保存结果
      const resultFile = path.join(
        CONFIG.workspaceDir,
        `results/${task.id}-result.md`
      );
      await fs.mkdir(path.dirname(resultFile), { recursive: true });
      await fs.writeFile(resultFile, result);

      await log(`结果已保存: ${resultFile}`);
    }

    await log('='.repeat(60));
    await log('🎉 所有任务已完成！');
    await log('='.repeat(60));
  }

  // 处理单个任务
  async processTask(task) {
    const systemMessage = {
      constructor: { name: 'SystemMessage' },
      content: `你是 goudan，一个 AI 开发者 agent。

你的任务：
${task.content}

可用的工具：
1. readFile - 读取文件
2. writeFile - 写入文件
3. exec - 执行命令
4. listFiles - 列出目录

工作流程：
1. 仔细分析任务要求
2. 使用 readFile 读取相关文件
3. 使用 exec 执行必要的命令
4. 使用 writeFile 保存结果
5. 确保代码质量

重要：
- 必须主动使用工具完成工作
- 不要只是说"我会做"，要真的去做
- 遇到问题尝试解决
- 完成后报告结果

工作目录：${CONFIG.workspaceDir}`
    };

    const userMessage = {
      constructor: { name: 'HumanMessage' },
      content: `请完成以下任务：

${task.content}

请使用可用的工具来完成这个任务。`
    };

    try {
      const response = await this.callZhipuAI([systemMessage, userMessage]);

      await log(`AI 响应: ${response.content.substring(0, 500)}...`);

      return response.content;
    } catch (error) {
      await log(`处理任务失败: ${error.message}`, 'error');
      return `错误: ${error.message}`;
    }
  }

  // 持续工作模式
  async startContinuousMode() {
    await log('启动持续工作模式...');

    while (true) {
      try {
        await this.run();

        // 等待一段时间后继续
        await log('等待 5 分钟后检查新任务...');
        await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000));

        // 重新加载任务
        await this.loadTasks();

      } catch (error) {
        await log(`持续工作模式错误: ${error.message}`, 'error');

        // 等待后重试
        await new Promise(resolve => setTimeout(resolve, 60000));
      }
    }
  }
}

// 主函数
async function main() {
  await log('Goudan Agent 启动中...');

  // 创建必要的目录
  await fs.mkdir(CONFIG.workspaceDir, { recursive: true });
  await fs.mkdir(CONFIG.tasksDir, { recursive: true });
  await fs.mkdir(CONFIG.logsDir, { recursive: true });
  await fs.mkdir(path.join(CONFIG.workspaceDir, 'results'), { recursive: true });

  await log('目录结构创建完成');

  // 创建 agent
  const agent = new GoudanAgent();

  // 显示可用工具
  await log('可用工具:');
  const tools = agent.getToolsList();
  for (const tool of tools) {
    await log(`  - ${tool.name}: ${tool.description}`);
  }

  // 开始运行（使用持续模式）
  await agent.startContinuousMode();
}

// 运行
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { GoudanAgent };
