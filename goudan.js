#!/usr/bin/env node

/**
 * 狗蛋儿 - 简化版 AI 开发者 Agent
 * 使用智谱AI API完成开发任务
 */

import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';

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
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

  console.log(logMessage);

  // 写入日志文件
  const logFile = path.join(CONFIG.logsDir, 'goudan.log');
  try {
    await fs.appendFile(logFile, logMessage + '\n');
  } catch (error) {
    // 忽略日志文件写入错误
  }
}

// 生成JWT token
function generateToken(apiKey) {
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
    log(`Token生成失败: ${error.message}`, 'error');
    throw error;
  }
}

// 调用智谱AI API
async function callZhipuAI(messages) {
  try {
    const token = generateToken(CONFIG.apiKey);

    const response = await axios.post(
      `${CONFIG.baseUrl}chat/completions`,
      {
        model: CONFIG.model,
        messages: messages
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    log(`智谱AI调用失败: ${error.message}`, 'error');
    throw error;
  }
}

// 工具函数
const tools = {
  // 读取文件
  async readFile(filePath) {
    try {
      await log(`读取文件: ${filePath}`);
      const content = await fs.readFile(filePath, 'utf-8');
      return content;
    } catch (error) {
      await log(`读取文件失败: ${error.message}`, 'error');
      return `错误: ${error.message}`;
    }
  },

  // 写入文件
  async writeFile(filePath, content) {
    try {
      await log(`写入文件: ${filePath}`);
      const dir = path.dirname(filePath);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(filePath, content, 'utf-8');
      return `成功写入文件: ${filePath}`;
    } catch (error) {
      await log(`写入文件失败: ${error.message}`, 'error');
      return `错误: ${error.message}`;
    }
  },

  // 执行命令
  async execCommand(command) {
    try {
      await log(`执行命令: ${command}`);
      const { stdout, stderr } = await execAsync(command, {
        cwd: CONFIG.workspaceDir,
        timeout: 30000
      });
      if (stderr) {
        await log(`命令stderr: ${stderr}`, 'warn');
      }
      return stdout || `命令执行完成`;
    } catch (error) {
      await log(`命令执行失败: ${error.message}`, 'error');
      return `错误: ${error.message}`;
    }
  },

  // 列出文件
  async listFiles(dirPath) {
    try {
      await log(`列出目录: ${dirPath}`);
      const files = await fs.readdir(dirPath);
      return files.join('\n');
    } catch (error) {
      await log(`列出目录失败: ${error.message}`, 'error');
      return `错误: ${error.message}`;
    }
  }
};

// 解析AI响应中的工具调用
function parseToolCalls(aiResponse) {
  const toolCalls = [];

  // 匹配 write_file 调用
  const writeFileMatch = aiResponse.match(/write_file\s*\(\s*['"`]([^'"`]+)['"`]\s*,\s*['"`](.+)['"`]\s*\)/s);
  if (writeFileMatch) {
    toolCalls.push({
      tool: 'writeFile',
      args: [writeFileMatch[1], writeFileMatch[2]]
    });
  }

  // 匹配 exec 调用
  const execMatch = aiResponse.match(/exec\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/);
  if (execMatch) {
    toolCalls.push({
      tool: 'execCommand',
      args: [execMatch[1]]
    });
  }

  // 匹配 read_file 调用
  const readFileMatch = aiResponse.match(/read_file\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/);
  if (readFileMatch) {
    toolCalls.push({
      tool: 'readFile',
      args: [readFileMatch[1]]
    });
  }

  return toolCalls;
}

// 处理单个任务
async function processTask(task) {
  const systemPrompt = `你是狗蛋儿(goudan)，一个AI开发者agent。

你的任务：
${task.content}

可用的工具：
1. readFile(filePath) - 读取文件内容
2. writeFile(filePath, content) - 写入文件内容
3. execCommand(command) - 执行命令行命令
4. listFiles(dirPath) - 列出目录中的文件

工具使用示例：
- writeFile('workspace/test.js', 'console.log("Hello");')
- execCommand('node workspace/test.js')
- readFile('workspace/test.js')

工作流程：
1. 仔细分析任务要求
2. 使用工具完成任务
3. 确保代码质量
4. 报告结果

重要：
- 必须主动使用工具完成工作
- 文件路径必须以 workspace/ 开头
- 不要只是说"我会做"，要真的去做
- 遇到问题尝试解决
- 完成后报告结果

工作目录：${CONFIG.workspaceDir}`;

  try {
    const response = await callZhipuAI([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `请完成以下任务：\n\n${task.content}` }
    ]);

    await log(`AI 响应: ${response.substring(0, 200)}...`);

    // 解析并执行工具调用
    const toolCalls = parseToolCalls(response);
    for (const call of toolCalls) {
      const tool = tools[call.tool];
      if (tool) {
        await tool(...call.args);
      }
    }

    return response;
  } catch (error) {
    await log(`处理任务失败: ${error.message}`, 'error');
    return `错误: ${error.message}`;
  }
}

// 加载任务
async function loadTasks() {
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

    return tasks.sort((a, b) => a.id.localeCompare(b.id));
  } catch (error) {
    await log(`加载任务失败: ${error.message}`, 'error');
    return [];
  }
}

// 主函数
async function main() {
  await log('='.repeat(60));
  await log('狗蛋儿 启动！准备开始工作...');
  await log('='.repeat(60));

  // 创建必要的目录
  await fs.mkdir(CONFIG.workspaceDir, { recursive: true });
  await fs.mkdir(CONFIG.tasksDir, { recursive: true });
  await fs.mkdir(CONFIG.logsDir, { recursive: true });
  await fs.mkdir(path.join(CONFIG.workspaceDir, 'results'), { recursive: true });

  // 加载任务
  const tasks = await loadTasks();
  await log(`加载了 ${tasks.length} 个任务`);

  if (tasks.length === 0) {
    await log('没有找到任务', 'warn');
    return;
  }

  // 处理每个任务
  let completed = 0;
  for (const task of tasks) {
    await log('');
    await log(`🎯 开始任务: ${task.id}`);
    await log('-'.repeat(40));

    const result = await processTask(task);

    await log(`✅ 任务完成: ${task.id}`);
    await log('');

    // 保存结果
    const resultFile = path.join(
      CONFIG.workspaceDir,
      `results/${task.id}-result.md`
    );
    await fs.mkdir(path.dirname(resultFile), { recursive: true });
    await fs.writeFile(resultFile, result);

    await log(`结果已保存: ${resultFile}`);
    completed++;
  }

  await log('='.repeat(60));
  await log('🎉 所有任务已完成！');
  await log(`📊 本轮完成: ${completed} 个任务`);
  await log('='.repeat(60));
}

// 运行
main().catch(console.error);
