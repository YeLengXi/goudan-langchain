# goudan 工作监控脚本 (带通知)
# 使用方法: powershell -ExecutionPolicy Bypass -File monitor-goudan.ps1

$LogPath = "E:\goudan-langchain\logs\goudan.log"
$WorkspacePath = "E:\goudan-langchain\workspace"
$CheckInterval = 30  # 检查间隔（秒）

$lastLogSize = 0
$lastFileCount = 0
$lastCommit = ""

function Show-Notification {
    param([string]$Title, [string]$Message)

    Add-Type -AssemblyName System.Windows.Forms
    $global:balloon = New-Object System.Windows.Forms.NotifyIcon
    $balloon.Icon = [System.Drawing.SystemIcons]::Information
    $balloon.BalloonTipIcon = "Info"
    $balloon.BalloonTipTitle = $Title
    $balloon.BalloonTipText = $Message
    $balloon.Visible = $true
    $balloon.ShowBalloonTip(10000)

    # 同时显示在控制台
    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] 📢 $Title" -ForegroundColor Cyan
    Write-Host "    $Message" -ForegroundColor Gray
    Write-Host ""
}

function Get-FileCount {
    $jsFiles = Get-ChildItem -Path $WorkspacePath -Filter "*.js" -Recurse -ErrorAction SilentlyContinue
    $cjsFiles = Get-ChildItem -Path $WorkspacePath -Filter "*.cjs" -Recurse -ErrorAction SilentlyContinue
    return ($jsFiles.Count + $cjsFiles.Count)
}

function Get-LatestLogLines {
    if (Test-Path $LogPath) {
        return Get-Content $LogPath -Tail 10
    }
    return @()
}

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  🐕 goudan 工作监控器 (带通知)" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  监控间隔: $CheckInterval 秒" -ForegroundColor Gray
Write-Host "  日志文件: $LogPath" -ForegroundColor Gray
Write-Host "  工作目录: $WorkspacePath" -ForegroundColor Gray
Write-Host ""
Write-Host "  按 Ctrl+C 停止监控" -ForegroundColor Yellow
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# 初始化
if (Test-Path $LogPath) {
    $lastLogSize = (Get-Item $LogPath).Length
}
$lastFileCount = Get-FileCount
$prevCommit = git -C "E:\goudan-langchain" log --oneline -1 2>$null

Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ✅ 监控已启动..." -ForegroundColor Green
Write-Host ""

while ($true) {
    # 检查日志文件变化
    if (Test-Path $LogPath) {
        $currentLogSize = (Get-Item $LogPath).Length

        if ($currentLogSize -gt $lastLogSize) {
            $newLogs = Get-LatestLogLines

            if ($newLogs.Count -gt 0) {
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] 📝 goudan 有新活动！" -ForegroundColor Yellow
                Write-Host ""

                foreach ($line in $newLogs) {
                    if ($line -match "\[ERROR\]") {
                        Write-Host "  $line" -ForegroundColor Red
                    } elseif ($line -match "\[WARN\]") {
                        Write-Host "  $line" -ForegroundColor Yellow
                    } elseif ($line -match "🎯|✅|💰|📊") {
                        Write-Host "  $line" -ForegroundColor Green
                    } else {
                        Write-Host "  $line" -ForegroundColor Gray
                    }
                }

                Write-Host ""

                # 发送通知
                $lastLog = $newLogs[-1]
                if ($lastLog -match "✅.*任务完成") {
                    Show-Notification "goudan 完成任务" "$lastLog"
                }
            }

            $lastLogSize = $currentLogSize
        }
    }

    # 检查新文件
    $currentFileCount = Get-FileCount
    if ($currentFileCount -gt $lastFileCount) {
        $newFiles = $currentFileCount - $lastFileCount
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] 🎉 发现 $newFiles 个新文件！" -ForegroundColor Green
        Write-Host ""

        # 列出最新的文件
        Get-ChildItem -Path $WorkspacePath -Include "*.js","*.cjs" -Recurse -ErrorAction SilentlyContinue |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First $newFiles |
        ForEach-Object {
            Write-Host "  📄 $($_.FullName.Replace($WorkspacePath, ''))" -ForegroundColor Cyan
        }

        Write-Host ""
        Show-Notification "goudan 创建了新文件" "发现了 $newFiles 个新文件"

        $lastFileCount = $currentFileCount
    }

    # 检查 git 提交
    $currentCommit = git -C "E:\goudan-langchain" log --oneline -1 2>$null
    if ($currentCommit -ne $prevCommit -and $prevCommit -ne "") {
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ✅ 新的 Git 提交: $currentCommit" -ForegroundColor Green
        Write-Host ""
        Show-Notification "goudan 提交了代码" $currentCommit
        $prevCommit = $currentCommit
    }

    # 等待后再次检查
    Start-Sleep -Seconds $CheckInterval
}
