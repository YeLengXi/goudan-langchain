import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// 加载环境变量
dotenv.config();

// 配置
const CONFIG = {
  apiKey: process.env.ZHIPUAI_API_KEY,
  model: process.env.ZHIPUAI_MODEL || 'glm-4-flash',
  baseUrl: process.env.ZHIPUAI_BASE_URL || 'https://open.bigmodel.cn/api/paas/v4/',
  workspaceDir: path.resolve(process.env.WORKSPACE_DIR || './workspace'),
  tasksDir: path.resolve(process.env.TASKS_DIR || './tasks'),
  logsDir: path.resolve(process.env.LOGS_DIR || './logs'),
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

// 调用智谱AI API
async function callZhipuAI(messages) {
  try {
    const response = await fetch(`${CONFIG.baseUrl}chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONFIG.apiKey}`,
      },
      body: JSON.stringify({
        model: CONFIG.model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 4096,
        tools: [
          {
            "type": "function",
            "function": {
              "name": "read_file",
              "description": "读取文件内容",
              "parameters": {
                "type": "object",
                "properties": {
                  "file_path": {
                    "type": "string",
                    "description": "文件路径"
                  }
                },
                "required": ["file_path"]
              }
            }
          },
          {
            "type": "function",
            "function": {
              "name": "write_file",
              "description": "写入文件内容",
              "parameters": {
                "type": "object",
                "properties": {
                  "file_path": {
                    "type": "string",
                    "description": "文件路径"
                  },
                  "content": {
                    "type": "string",
                    "description": "文件内容"
                  }
                },
                "required": ["file_path", "content"]
              }
            }
          },
          {
            "type": "function",
            "function": {
              "name": "exec_command",
              "description": "执行命令行命令",
              "parameters": {
                "type": "object",
                "properties": {
                  "command": {
                    "type": "string",
                    "description": "要执行的命令"
                  }
                },
                "required": ["command"]
              }
            }
          },
          {
            "type": "function",
            "function": {
              "name": "list_directory",
              "description": "列出目录内容",
              "parameters": {
                "type": "object",
                "properties": {
                  "directory_path": {
                    "type": "string",
                    "description": "目录路径"
                  }
                },
                "required": ["directory_path"]
              }
            }
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`API 请求失败: ${response.status}`);
    }

    const data = await response.json();

    // 处理工具调用
    if (data.choices && data.choices[0] && data.choices[0].message) {
      let message = data.choices[0].message;
      let allMessages = [...messages];

      // 如果有工具调用，进行多轮对话直到完成
      let maxRounds = 10; // 最多10轮工具调用
      let round = 0;

      while (message.tool_calls && message.tool_calls.length > 0 && round < maxRounds) {
        round++;
        await log(`AI 请求调用工具 (第 ${round} 轮): ${message.tool_calls.length} 个`);

        const toolResults = [];

        for (const toolCall of message.tool_calls) {
          const functionName = toolCall.function.name;
          const functionArgs = JSON.parse(toolCall.function.arguments);

          await log(`执行工具: ${functionName}`);
          await log(`参数: ${JSON.stringify(functionArgs)}`);

          const result = await executeTool(functionName, functionArgs);
          toolResults.push({
            tool_call_id: toolCall.id,
            role: 'tool',
            name: functionName,
            content: result,
          });
        }

        // 添加 AI 的响应和工具结果到消息历史
        allMessages.push(message);
        allMessages.push(...toolResults);

        // 再次调用 API，发送工具结果
        const followUpResponse = await fetch(`${CONFIG.baseUrl}chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CONFIG.apiKey}`,
          },
          body: JSON.stringify({
            model: CONFIG.model,
            messages: allMessages,
            temperature: 0.7,
            max_tokens: 4096,
            tools: [{
              "type": "function",
              "function": {
                "name": "read_file",
                "description": "读取文件内容",
                "parameters": {
                  "type": "object",
                  "properties": {
                    "file_path": {
                      "type": "string",
                      "description": "文件路径"
                    }
                  },
                  "required": ["file_path"]
                }
              }
            },
            {
              "type": "function",
              "function": {
                "name": "write_file",
                "description": "写入文件内容",
                "parameters": {
                  "type": "object",
                  "properties": {
                    "file_path": {
                      "type": "string",
                      "description": "文件路径"
                    },
                    "content": {
                      "type": "string",
                      "description": "文件内容"
                    }
                  },
                  "required": ["file_path", "content"]
                }
              }
            },
            {
              "type": "function",
              "function": {
                "name": "exec_command",
                "description": "执行命令行命令",
                "parameters": {
                  "type": "object",
                  "properties": {
                    "command": {
                      "type": "string",
                      "description": "要执行的命令"
                    }
                  },
                  "required": ["command"]
                }
              }
            },
            {
              "type": "function",
              "function": {
                "name": "list_directory",
                "description": "列出目录内容",
                "parameters": {
                  "type": "object",
                  "properties": {
                    "directory_path": {
                      "type": "string",
                      "description": "目录路径"
                    }
                  },
                  "required": ["directory_path"]
                }
              }
            }]
          }),
        });

        const followUpData = await followUpResponse.json();
        message = followUpData.choices[0].message;
      }

      if (round >= maxRounds) {
        await log('达到最大工具调用轮数', 'warn');
      }

      return message.content;
    }

    throw new Error('无效的 API 响应');
  } catch (error) {
    await log(`API 调用失败: ${error.message}`, 'error');
    throw error;
  }
}

// 执行工具
async function executeTool(functionName, args) {
  try {
    switch (functionName) {
      case 'read_file':
        return await readFile(args.file_path);

      case 'write_file':
        return await writeFile(args.file_path, args.content);

      case 'exec_command':
        return await execCommand(args.command);

      case 'list_directory':
        return await listDirectory(args.directory_path);

      default:
        return `错误: 未知工具 ${functionName}`;
    }
  } catch (error) {
    return `错误: ${error.message}`;
  }
}

// 工具实现
async function readFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    await log(`读取文件: ${filePath} (${content.length} 字符)`);
    return `文件内容:\n\n${content}`;
  } catch (error) {
    await log(`读取文件失败: ${error.message}`, 'error');
    return `错误: ${error.message}`;
  }
}

async function writeFile(filePath, content) {
  try {
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

async function execCommand(command) {
  try {
    await log(`执行命令: ${command}`);
    const { stdout, stderr } = await execAsync(command, {
      cwd: CONFIG.workspaceDir,
      timeout: 30000,
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

async function listDirectory(dirPath) {
  try {
    await log(`列出目录: ${dirPath}`);
    const files = await fs.readdir(dirPath);
    return `目录内容:\n\n${files.join('\n')}`;
  } catch (error) {
    await log(`列出目录失败: ${error.message}`, 'error');
    return `错误: ${error.message}`;
  }
}

// Goudan Agent
class GoudanAgent {
  constructor() {
    this.taskQueue = [];
    this.currentTask = null;
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

  // 处理单个任务
  async processTask(task) {
    const systemPrompt = `你是 goudan，一个务实的 AI 开发者 agent。

【你的任务】
${task.content}

【可用工具】
1. read_file - 读取文件内容
2. write_file - 写入文件内容（参数：file_path, content）
3. exec_command - 执行命令行命令
4. list_directory - 列出目录内容

【最重要的规则 - 必须遵守】
1. 立即使用工具完成任务 - 不要描述，直接行动
2. 禁止使用"我将"、"我会"、"我计划"等词语
3. 不要生成代码示例 - 直接用 write_file 创建完整文件
4. 不要解释你的计划 - 直接调用工具
5. 一次响应中尽可能调用多个工具
6. 读取文件后，立即使用 write_file 创建新文件
7. 创建文件后，使用 exec_command 运行测试

【工作目录】
${CONFIG.workspaceDir}

【错误示例 ❌】
"我将读取文件，然后创建一个新文件"
"这是代码示例：\`\`\`javascript...\`\`\`"
"首先，让我分析一下..."

【正确示例 ✅】
[直接调用 read_file 工具]
[直接调用 write_file 工具创建完整文件]
[直接调用 exec_command 运行测试]

现在开始工作，立即使用工具！`;

    const userPrompt = `请完成以下任务：

${task.content}

请使用可用的工具来完成这个任务。`;

    try {
      const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ];

      const response = await callZhipuAI(messages);

      await log(`AI 响应: ${response.substring(0, 500)}...`);

      return response;
    } catch (error) {
      await log(`处理任务失败: ${error.message}`, 'error');
      return `错误: ${error.message}`;
    }
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

      // 处理任务
      const result = await this.processTask(task);

      await log(`✅ 任务完成: ${task.id}`);
      await log(`结果: ${result.substring(0, 200)}...`);
      await log('');

      // 保存结果
      const resultFile = path.join(
        CONFIG.workspaceDir,
        'results',
        `${task.id}-result.md`
      );
      await fs.mkdir(path.dirname(resultFile), { recursive: true });
      await fs.writeFile(resultFile, result);

      await log(`结果已保存: ${resultFile}`);
    }

    await log('='.repeat(60));
    await log('🎉 所有任务已完成！');
    await log('='.repeat(60));
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
  await log(`配置: 模型=${CONFIG.model}`);
  await log(`工作目录: ${CONFIG.workspaceDir}`);
  await log(`任务目录: ${CONFIG.tasksDir}`);

  // 创建 agent
  const agent = new GoudanAgent();

  // 开始运行
  await agent.run();

  // 或者使用持续模式：
  // await agent.startContinuousMode();
}

// 运行
main().catch(console.error);
