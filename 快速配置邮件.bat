@echo off
echo ============================================================
echo   goudan 邮件通知配置助手
echo ============================================================
echo.
echo   正在打开 QQ 邮箱登录页面...
echo.
start https://mail.qq.com
echo.
echo   配置步骤：
echo.
echo   1. 登录 QQ 邮箱
echo   2. 点击顶部 【设置】→【账户】
echo   3. 向下滚动找到 【POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务】
echo   4. 开启 【POP3/SMTP 服务】或【IMAP/SMTP 服务】
echo   5. 点击【生成授权码】
echo   6. 按照提示发送短信
echo   7. 复制生成的【授权码】（16 位字符）
echo.
echo   完成后按任意键继续配置...
pause >nul

echo.
echo   请输入你的 QQ 邮箱授权码：
echo.
set /p AUTH_CODE=

echo.
echo   正在配置...

cd /d E:\goudan-langchain

echo. >> .env
echo # 邮件通知配置 >> .env
echo EMAIL_SERVICE=qq >> .env
echo EMAIL_USER=77037708@qq.com >> .env
echo EMAIL_PASS=%AUTH_CODE% >> .env
echo EMAIL_TO=77037708@qq.com >> .env

echo.
echo ============================================================
echo   ✅ 配置完成！
echo ============================================================
echo.
echo   配置已保存到 .env 文件
echo.
echo   下一步：
echo   1. 重启 goudan
echo   2. 运行测试邮件: node test-email.js
echo.
echo   按任意键测试邮件...
pause >nul

node test-email.js

pause
