// 邮件测试脚本
import dotenv from 'dotenv';
import { notifyStartup } from './notify.js';

// 加载环境变量
dotenv.config();

async function testEmail() {
  console.log('============================================================');
  console.log('  goudan 邮件通知测试');
  console.log('============================================================');
  console.log('');
  console.log('配置信息:');
  console.log(`  邮箱服务: ${process.env.EMAIL_SERVICE || 'qq'}`);
  console.log(`  发件邮箱: ${process.env.EMAIL_USER || '77037708@qq.com'}`);
  console.log(`  收件邮箱: ${process.env.EMAIL_TO || '77037708@qq.com'}`);
  console.log('');
  console.log('============================================================');
  console.log('');

  // 检查配置
  if (!process.env.EMAIL_PASS) {
    console.error('❌ 错误: 未设置 EMAIL_PASS（邮箱授权码）');
    console.log('');
    console.log('请按照以下步骤配置：');
    console.log('1. 打开 E:\\goudan-langchain\\.env 文件');
    console.log('2. 添加以下配置：');
    console.log('   EMAIL_PASS=你的QQ邮箱授权码');
    console.log('');
    console.log('获取授权码：');
    console.log('1. 登录 QQ 邮箱: https://mail.qq.com');
    console.log('2. 设置 → 账户 → POP3/SMTP 服务');
    console.log('3. 开启服务并生成授权码');
    console.log('');
    process.exit(1);
  }

  console.log('正在发送测试邮件...');
  console.log('');

  try {
    await notifyStartup();

    console.log('');
    console.log('============================================================');
    console.log('  ✅ 测试成功！');
    console.log('============================================================');
    console.log('');
    console.log('请检查你的邮箱（包括垃圾邮件文件夹）');
    console.log('如果收到测试邮件，说明邮件通知已正确配置！');
    console.log('');

  } catch (error) {
    console.error('');
    console.error('============================================================');
    console.error('  ❌ 测试失败！');
    console.error('============================================================');
    console.error('');
    console.error('错误信息:', error.message);
    console.error('');
    console.error('请检查：');
    console.error('1. 授权码是否正确');
    console.error('2. 网络连接是否正常');
    console.error('3. SMTP 服务是否已开启');
    console.error('');
  }
}

testEmail();
