@echo off
echo 正在创建桌面快捷方式...

set TARGET=%USERPROFILE%\Desktop\goudan.lnk
set SOURCE=E:\goudan-langchain\start-goudan.bat

powershell "$s=(New-Object -COM WScript.Shell).CreateShortcut('%TARGET%');$s.TargetPath='%SOURCE%';$s.WorkingDirectory='E:\goudan-langchain';$s.Description='启动 goudan AI Agent';$s.Save()"

echo ✅ 快捷方式已创建: %TARGET%
echo.
pause
