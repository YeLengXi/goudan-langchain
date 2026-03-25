@echo off
setlocal enabledelayedexpansion

:: 清屏并设置颜色
cls
color 0A

echo.
echo ============================================================
echo   🐕 goudan 工作状态面板
echo ============================================================
echo.
echo   用户: YeLengXi
echo   时间: %date% %time%
echo.

:: 检查 goudan 是否在运行
tasklist /FI "IMAGENAME eq node.exe" 2>nul | find /I "node.exe" >nul
if %ERRORLEVEL% EQU 0 (
  echo   状态: ✅ 运行中
  echo.
) else (
  echo   状态: ❌ 未运行
  echo.
  echo   请运行 start-goudan.bat 启动 goudan
  echo.
  pause
  exit /b
)

:: 统计任务数量
set TASK_COUNT=0
for %%f in (E:\goudan-langchain\tasks\*.md) do set /a TASK_COUNT+=1
echo   📋 任务队列: !TASK_COUNT! 个任务
echo.

:: 统计生成的文件
set FILE_COUNT=0
for /f %%a in ('dir /s /b "E:\goudan-langchain\workspace\*.js" "E:\goudan-langchain\workspace\*.cjs" 2^>nul ^| find /c /v ""') do set FILE_COUNT=%%a
echo   📁 生成的文件: !FILE_COUNT! 个
echo.

:: 检查 git 状态
cd /d E:\goudan-langchain
for /f %%i in ('git log --oneline -1 2^>nul') do set LAST_COMMIT=%%i
echo   📝 最新提交: !LAST_COMMIT!
echo.

:: 显示最新日志
echo   ============================================================
echo   最新活动:
echo   ============================================================
echo.
if exist "E:\goudan-langchain\logs\goudan.log" (
  powershell -Command "Get-Content 'E:\goudan-langchain\logs\goudan.log' -Tail 10"
) else (
  echo   暂无日志
)
echo.

:: 菜单
echo   ============================================================
echo   操作菜单:
echo   ============================================================
echo.
echo   1. 查看完整日志
echo   2. 查看生成的文件
echo   3. 查看 Git 历史
echo   4. 添加新任务
echo   5. 重启 goudan
echo   6. 启动监控器
echo   0. 退出
echo.

set /p choice="请选择操作 [0-6]: "

if "%choice%"=="1" (
  cls
  type "E:\goudan-langchain\logs\goudan.log" | more
  pause
  goto :menu
)

if "%choice%"=="2" (
  cls
  echo 生成的文件:
  echo.
  dir /s /b "E:\goudan-langchain\workspace\*.js" "E:\goudan-langchain\workspace\*.cjs" 2>nul
  echo.
  pause
  goto :menu
)

if "%choice%"=="3" (
  cls
  echo Git 提交历史:
  echo.
  cd /d E:\goudan-langchain
  git log --oneline -10
  echo.
  pause
  goto :menu
)

if "%choice%"=="4" (
  echo.
  echo 请在 E:\goudan-langchain\tasks\ 目录创建新的 .md 文件
  echo.
  notepad E:\goudan-langchain\tasks\template.md
  pause
  goto :menu
)

if "%choice%"=="5" (
  echo.
  echo 重启 goudan...
  taskkill /F /IM node.exe >nul 2>&1
  start /B cmd /c "cd /d E:\goudan-langchain && node index.js"
  echo.
  echo goudan 已重启
  echo.
  pause
  goto :menu
)

if "%choice%"=="6" (
  echo.
  echo 启动监控器...
  start powershell -ExecutionPolicy Bypass -File "E:\goudan-langchain\monitor-goudan.ps1"
  echo.
  echo 监控器已启动
  echo.
  pause
  goto :menu
)

:menu
cls
goto :start

:start
