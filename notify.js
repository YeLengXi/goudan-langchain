// goudan 邮件通知系统 (ES6 模块版本)
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// 邮件配置（从环境变量读取）
const EMAIL_CONFIG = {
  service: process.env.EMAIL_SERVICE || 'qq',
  auth: {
    user: process.env.EMAIL_USER || '77037708@qq.com',
    pass: process.env.EMAIL_PASS || ''
  }
};

// 收件人邮箱（从环境变量读取）
const RECIPIENT_EMAIL = process.env.EMAIL_TO || '77037708@qq.com';

// 创建邮件传输器
let transporter = null;

export function initEmail() {
  try {
    // 检查是否配置了授权码
    if (!EMAIL_CONFIG.auth.pass || EMAIL_CONFIG.auth.pass === 'YOUR_PASSWORD') {
      console.log('⚠️ 邮件授权码未配置，邮件通知已禁用');
      return false;
    }

    transporter = nodemailer.createTransport({
      service: EMAIL_CONFIG.service,
      auth: EMAIL_CONFIG.auth
    });
    console.log('✅ 邮件系统初始化成功');
    console.log(`📧 发件邮箱: ${EMAIL_CONFIG.auth.user}`);
    console.log(`📬 收件邮箱: ${RECIPIENT_EMAIL}`);
    return true;
  } catch (error) {
    console.error('❌ 邮件系统初始化失败:', error.message);
    return false;
  }
}

// 发送邮件通知
export async function sendNotification(subject, text, html = null) {
  if (!transporter) {
    console.error('邮件系统未初始化');
    return false;
  }

  const mailOptions = {
    from: `"goudan AI Agent" <${EMAIL_CONFIG.auth.user}>`,
    to: RECIPIENT_EMAIL,
    subject: `[goudan] ${subject}`,
    text: text,
    html: html || text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ 邮件发送成功:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ 邮件发送失败:', error.message);
    return false;
  }
}

// 任务完成通知
export async function notifyTaskCompleted(taskId, taskName, result) {
  const subject = `✅ 任务完成: ${taskName}`;
  const text = `
goudan 完成了一个任务！

任务 ID: ${taskId}
任务名称: ${taskName}
完成时间: ${new Date().toLocaleString('zh-CN')}

结果预览:
${result.substring(0, 200)}...

---
goudan AI Agent
自主工作，赚钱养活自己！💰
  `;

  const html = `
<h2>🎉 goudan 完成了任务！</h2>

<table border="1" cellpadding="10" cellspacing="0">
  <tr><td><b>任务 ID</b></td><td>${taskId}</td></tr>
  <tr><td><b>任务名称</b></td><td>${taskName}</td></tr>
  <tr><td><b>完成时间</b></td><td>${new Date().toLocaleString('zh-CN')}</td></tr>
</table>

<h3>结果预览:</h3>
<pre style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${result.substring(0, 200)}...</pre>

<p><i>goudan AI Agent - 自主工作，赚钱养活自己！💰</i></p>
  `;

  await sendNotification(subject, text, html);
}

// 新文件创建通知
export async function notifyFileCreated(fileName, filePath) {
  const subject = `📄 新文件创建: ${fileName}`;
  const text = `
goudan 创建了一个新文件！

文件名: ${fileName}
路径: ${filePath}
时间: ${new Date().toLocaleString('zh-CN')}

---
goudan AI Agent
  `;

  const html = `
<h2>📄 goudan 创建了新文件！</h2>

<table border="1" cellpadding="10" cellspacing="0">
  <tr><td><b>文件名</b></td><td>${fileName}</td></tr>
  <tr><td><b>路径</b></td><td>${filePath}</td></tr>
  <tr><td><b>时间</b></td><td>${new Date().toLocaleString('zh-CN')}</td></tr>
</table>

<p><i>goudan AI Agent</i></p>
  `;

  await sendNotification(subject, text, html);
}

// Git 提交通知
export async function notifyGitCommit(commitHash, commitMessage) {
  const subject = `✅ Git 提交: ${commitHash}`;
  const text = `
goudan 提交了代码！

提交 ID: ${commitHash}
提交信息: ${commitMessage}
时间: ${new Date().toLocaleString('zh-CN')}

---
goudan AI Agent
  `;

  const html = `
<h2>✅ goudan 提交了代码！</h2>

<table border="1" cellpadding="10" cellspacing="0">
  <tr><td><b>提交 ID</b></td><td><code>${commitHash}</code></td></tr>
  <tr><td><b>提交信息</b></td><td>${commitMessage}</td></tr>
  <tr><td><b>时间</b></td><td>${new Date().toLocaleString('zh-CN')}</td></tr>
</table>

<p><i>goudan AI Agent</i></p>
  `;

  await sendNotification(subject, text, html);
}

// 收入统计通知
export async function notifyEarnings(tasksCompleted, totalEarnings) {
  const subject = `💰 收入更新: ¥${totalEarnings.toFixed(2)}`;
  const text = `
goudan 的收入统计！

完成任务: ${tasksCompleted} 个
估算收入: ¥${totalEarnings.toFixed(2)} (约 $${(totalEarnings / 7).toFixed(2)})
时间: ${new Date().toLocaleString('zh-CN')}

继续努力！💪

---
goudan AI Agent
  `;

  const html = `
<h2>💰 goudan 收入更新！</h2>

<table border="1" cellpadding="10" cellspacing="0">
  <tr><td><b>完成任务</b></td><td>${tasksCompleted} 个</td></tr>
  <tr><td><b>估算收入</b></td><td>¥${totalEarnings.toFixed(2)} (约 $${(totalEarnings / 7).toFixed(2)})</td></tr>
  <tr><td><b>时间</b></td><td>${new Date().toLocaleString('zh-CN')}</td></tr>
</table>

<p><b>继续努力！💪</b></p>

<p><i>goudan AI Agent</i></p>
  `;

  await sendNotification(subject, text, html);
}

// 错误通知
export async function notifyError(errorType, errorMessage) {
  const subject = `❌ 错误: ${errorType}`;
  const text = `
goudan 遇到了错误！

错误类型: ${errorType}
错误信息: ${errorMessage}
时间: ${new Date().toLocaleString('zh-CN')}

请检查 goudan 的状态！

---
goudan AI Agent
  `;

  const html = `
<h2 style="color: red;">❌ goudan 遇到了错误！</h2>

<table border="1" cellpadding="10" cellspacing="0">
  <tr><td><b>错误类型</b></td><td>${errorType}</td></tr>
  <tr><td><b>错误信息</b></td><td><code>${errorMessage}</code></td></tr>
  <tr><td><b>时间</b></td><td>${new Date().toLocaleString('zh-CN')}</td></tr>
</table>

<p><b>请检查 goudan 的状态！</b></p>

<p><i>goudan AI Agent</i></p>
  `;

  await sendNotification(subject, text, html);
}

// 启动通知
export async function notifyStartup() {
  const subject = `🚀 goudan 已启动`;
  const text = `
goudan 已开始工作！

启动时间: ${new Date().toLocaleString('zh-CN')}
工作模式: 持续工作模式
检查间隔: 10 分钟

goudan 将自主完成开发任务并赚钱养活自己！💰

---
goudan AI Agent
  `;

  const html = `
<h2>🚀 goudan 已启动！</h2>

<p>goudan 已开始自主工作！</p>

<table border="1" cellpadding="10" cellspacing="0">
  <tr><td><b>启动时间</b></td><td>${new Date().toLocaleString('zh-CN')}</td></tr>
  <tr><td><b>工作模式</b></td><td>持续工作模式</td></tr>
  <tr><td><b>检查间隔</b></td><td>10 分钟</td></tr>
</table>

<p>goudan 将自主完成开发任务并赚钱养活自己！💰</p>

<p><i>goudan AI Agent</i></p>
  `;

  await sendNotification(subject, text, html);
}
