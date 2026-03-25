@echo off
setlocal enabledelayedexpansion

:: goudan 监控器 (批处理版)
:: 使用方法: 双击运行

:main
cls
color 0A

echo ============================================================
echo   goudan 工作监控器
echo ============================================================
echo.
echo   按 Ctrl+C 停止监控
echo.

set LOG_FILE=E:\goudan-langchain\logs\goudan.log
set WORKSPACE=E:\goudan-langchain\workspace
set LAST_SIZE=0
set CHECK_COUNT=0

:loop
set /a CHECK_COUNT+=1

:: 显示标题
cls
echo ============================================================
echo   goudan 工作监控器 - 检查 #%CHECK_COUNT%
echo ============================================================
echo.
echo   时间: %date% %time%
echo.

:: 检查日志文件
if exist "%LOG_FILE%" (
  for %%A in ("%LOG_FILE%") do set CURRENT_SIZE=%%~zA

  if !CURRENT_SIZE! gtr !LAST_SIZE! (
    echo   [新活动] 日志文件已更新
    echo.
    echo   最新日志:
    echo   --------------------------------------------------------
    powershell -Command "Get-Content '%LOG_FILE%' -Tail 15 | ForEach-Object { Write-Host '   ' $_ }"
    echo   --------------------------------------------------------
    echo.

    set LAST_SIZE=!CURRENT_SIZE!
  ) else (
    echo   [状态] 等待新活动...
    echo.
  )
) else (
  echo   [错误] 日志文件不存在
  echo.
)

:: 统计生成的文件
set FILE_COUNT=0
for /f %%a in ('dir /s /b "%WORKSPACE%\*.js" "%WORKSPACE%\*.cjs" 2^>nul ^| find /c /v ""') do set FILE_COUNT=%%a

echo   [文件] 已生成 !FILE_COUNT! 个 JS/CJS 文件
echo.

:: 检查 git 提交
cd /d E:\goudan-langchain
for /f %%i in ('git log --oneline -1 2^>nul') do set LAST_COMMIT=%%i

if defined LAST_COMMIT (
  echo   [Git] 最新提交: !LAST_COMMIT!
) else (
  echo   [Git] 暂无提交
)

echo.
echo ============================================================
echo   下次检查: 30 秒后
echo   按 Ctrl+C 停止
echo ============================================================

:: 等待 30 秒
timeout /t 30 /nobreak >nul

goto loop

endlocal
