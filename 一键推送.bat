@echo off
echo ============================================================
echo   goudan 代码推送助手
echo ============================================================
echo.
echo   用户: YeLengXi
echo   仓库: goudan-langchain
echo.
echo   请确保已在 GitHub 上创建了仓库！
echo.
pause

echo.
echo   步骤 1: 检查远程仓库...
echo.

cd /d E:\goudan-langchain

:: 检查是否已添加远程仓库
git remote get-url origin >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo   未找到远程仓库，正在添加...
  git remote add origin https://github.com/YeLengXi/goudan-langchain.git
  echo   ✅ 远程仓库已添加
) else (
  echo   ✅ 远程仓库已存在
)

echo.
echo   步骤 2: 推送代码到 GitHub...
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
  echo.
  echo ============================================================
  echo   ✅ 推送成功！
  echo ============================================================
  echo.
  echo   仓库地址: https://github.com/YeLengXi/goudan-langchain
  echo.
  echo   下一步：
  echo   1. 访问仓库并启用 GitHub Sponsors
  echo   2. 编辑 .github/FUNDING.yml 添加赞助链接
  echo   3. 分享项目到社交媒体
  echo.
  echo   goudan 将自动推送所有更新！
  echo.
) else (
  echo.
  echo ============================================================
  echo   ❌ 推送失败！
  echo ============================================================
  echo.
  echo   请确保：
  echo   1. 已在 GitHub 上创建了仓库
  echo   2. 仓库名称正确: goudan-langchain
  echo   3. 你的 GitHub 账号有权限
  echo.
  echo   创建仓库: https://github.com/new
  echo.
  echo   创建后重新运行此脚本。
  echo.
)

pause
