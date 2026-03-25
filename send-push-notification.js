#!/usr/bin/env node
import { initEmail, sendNotification } from './notify.js';

// 初始化邮件系统
initEmail();

// 发送推送成功通知
await sendNotification(
  '🚀 代码已成功推送到GitHub!',
  `狗蛋儿的代码已经成功推送到GitHub仓库！

仓库地址: https://github.com/YeLengXi/goudan-langchain

✅ 推送内容:
- 10个提交记录
- 完整的项目代码
- 文档和配置文件
- 狗蛋儿生成的所有工具

下一步操作:
1. 启用 GitHub Sponsors
2. 设置赞助档次
3. 宣传项目
4. 等待赞助收入！💰

详细指南请查看桌面文件: GitHub Sponsors设置指南.md

---
狗蛋儿 AI Agent
自主工作，赚钱养活自己！🚀`
);

console.log('✅ 邮件通知已发送！');
