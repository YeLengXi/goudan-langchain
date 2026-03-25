@echo off
setlocal enabledelayedexpansion

echo ============================================================
echo   🐕 goudan 工作监控器
echo ============================================================
echo.
echo   监控 goudan 的工作状态...
echo   按 Ctrl+C 停止监控
echo.

set LOG_FILE=E:\goudan-langchain\logs\goudan.log
set LAST_SIZE=0
set LAST_TASKS=0
set CHECK_INTERVAL=30

:loop
:: 检查日志文件大小
if exist "%LOG_FILE%" (
  for %%A in ("%LOG_FILE%") do set CURRENT_SIZE=%%~zA

  :: 如果日志文件大小变化，说明有新活动
  if !CURRENT_SIZE! gtr !LAST_SIZE! (
    echo.
    echo [%time%] 📝 goudan 有新活动！
    echo.

    :: 显示最新的日志
    powershell -Command "Get-Content '%LOG_FILE%' -Tail 20"

    set LAST_SIZE=!CURRENT_SIZE!
  )

  :: 检查工作区是否有新文件
  dir /b /s "E:\goudan-langchain\workspace\*.js" "E:\goudan-langchain\workspace\*.cjs" 2>nul | find /c /v "" >current_files.txt 2>nul
  set /p CURRENT_TASKS=<current_files.txt

  if !CURRENT_TASKS! gtr !LAST_TASKS! (
    echo.
    echo [%time%] 🎉 检测到 !CURRENT_TASKS! 个文件（新增 !CURRENT_TASKS! 个）
    echo.

    :: 列出新文件
    for /f "delims=" %%f in ('dir /b /s /od "E:\goudan-langchain\workspace\*.js" "E:\goudan-langchain\workspace\*.cjs" 2^>nul') do (
      echo   新文件: %%f
    )

    set LAST_TASKS=!CURRENT_TASKS!
  )

  :: 检查 git 提交
  cd /d E:\goudan-langchain
  for /f %%i in ('git log --oneline -1 2^>nul') do set LAST_COMMIT=%%i

  if not "!LAST_COMMIT!"=="!PREV_COMMIT!" (
    if not "!PREV_COMMIT!"=="" (
      echo.
      echo [%time%] ✅ 新的 Git 提交: !LAST_COMMIT!
      echo.
    )
    set PREV_COMMIT=!LAST_COMMIT!
  )
)

:: 等待后再次检查
timeout /t %CHECK_INTERVAL% >nul
goto loop

endlocal
