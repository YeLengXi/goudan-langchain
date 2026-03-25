@echo off
echo ============================================================
echo   创建 GitHub 仓库并推送代码
echo ============================================================
echo.
echo   用户名: YeLengXi
echo   仓库名: goudan-langchain
echo.
echo   请确保你已登录 GitHub 账号
echo.
pause

echo.
echo   步骤 1: 在 GitHub 上创建仓库...
echo.
echo   请访问以下链接创建仓库：
echo   https://github.com/new
echo.
echo   仓库名称: goudan-langchain
echo   描述: goudan - AI Developer Agent
echo   选择 Public (公开)
echo   不要勾选 "Add a README file"
echo.
pause

echo.
echo   步骤 2: 推送代码到 GitHub...
echo.

cd /d E:\goudan-langchain

git remote add origin https://github.com/YeLengXi/goudan-langchain.git 2>nul
git branch -M main
git push -u origin main

if %ERRORLEVEL% EQU 0 (
  echo.
  echo ============================================================
  echo   ✅ 成功推送到 GitHub！
  echo ============================================================
  echo.
  echo   仓库地址: https://github.com/YeLengXi/goudan-langchain
  echo.
  echo   下一步：
  echo   1. 访问仓库并启用 GitHub Sponsors
  echo   2. 运行 goudan 开始工作
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
  echo   然后重新运行此脚本。
  echo.
)

pause
