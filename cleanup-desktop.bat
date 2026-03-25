@echo off
echo ============================================================
echo   桌面清理工具
echo ============================================================
echo.

set DESKTOP=C:\Users\AdminMa\Desktop
set ARCHIVE=%DESKTOP%\桌面存档_%date:~0,4%%date:~5,2%%date:~8,2%

echo 正在创建存档文件夹...
if not exist "%ARCHIVE%" mkdir "%ARCHIVE%"

echo.
echo 正在整理文件...
echo.

:: 移动 Conway 相关文件
move "%DESKTOP%\*Conway*.md" "%ARCHIVE%\" 2>nul
move "%DESKTOP%\*Conway*.txt" "%ARCHIVE%\" 2>nul

:: 移动 goudan 相关文件
move "%DESKTOP%\*goudan*.md" "%ARCHIVE%\" 2>nul

:: 移动 GitHub 相关文件
move "%DESKTOP%\*GitHub*.md" "%ARCHIVE%\" 2>nul
move "%DESKTOP%\*GitHub*.txt" "%ARCHIVE%\" 2>nul

:: 移动任务清单
move "%DESKTOP%\*任务*.md" "%ARCHIVE%\" 2>nul
move "%DESKTOP%\*工作*.md" "%ARCHIVE%\" 2>nul

:: 移动 Twitter 相关
move "%DESKTOP%\*Twitter*.txt" "%ARCHIVE%\" 2>nul

:: 移动 Anthropic 相关
move "%DESKTOP%\*Anthropic*.md" "%ARCHIVE%\" 2>nul

:: 移动临时文本文件
move "%DESKTOP%\新建文本文档*.txt" "%ARCHIVE%\" 2>nul

:: 移动 Python 脚本
move "%DESKTOP%\*.py" "%ARCHIVE%\" 2>nul

echo.
echo ============================================================
echo   ✅ 桌面清理完成！
echo ============================================================
echo.
echo   已归档文件保存在: %ARCHIVE%
echo.
echo   保留在桌面的文件:
dir /b "%DESKTOP%" | findstr /v "桌面存档"
echo.

pause
