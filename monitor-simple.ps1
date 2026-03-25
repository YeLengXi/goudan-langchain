# goudan 工作监控脚本 (简化版)
# 使用方法: 在 PowerShell 中运行 .\monitor-simple.ps1

$LogPath = "E:\goudan-langchain\logs\goudan.log"
$WorkspacePath = "E:\goudan-langchain\workspace"
$CheckInterval = 30

$lastLogSize = 0
$lastFileCount = 0
$prevCommit = ""

function Get-FileCount {
    $jsFiles = Get-ChildItem -Path $WorkspacePath -Filter "*.js" -Recurse -ErrorAction SilentlyContinue
    $cjsFiles = Get-ChildItem -Path $WorkspacePath -Filter "*.cjs" -Recurse -ErrorAction SilentlyContinue
    return ($jsFiles.Count + $cjsFiles.Count)
}

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  goudan 工作监控器" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  监控间隔: $CheckInterval 秒" -ForegroundColor Gray
Write-Host "  按 Ctrl+C 停止监控" -ForegroundColor Yellow
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# 初始化
if (Test-Path $LogPath) {
    $lastLogSize = (Get-Item $LogPath).Length
}
$lastFileCount = Get-FileCount
try {
    $prevCommit = git -C "E:\goudan-langchain" log --oneline -1 2>$null
} catch {
    $prevCommit = ""
}

Write-Host "[$(Get-Date -Format 'HH:mm:ss')] 监控已启动..." -ForegroundColor Green
Write-Host ""

while ($true) {
    # 检查日志文件变化
    if (Test-Path $LogPath) {
        $currentLogSize = (Get-Item $LogPath).Length

        if ($currentLogSize -gt $lastLogSize) {
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] goudan 有新活动！" -ForegroundColor Yellow
            Write-Host ""

            # 显示最新的日志
            $newLogs = Get-Content $LogPath -Tail 10
            foreach ($line in $newLogs) {
                if ($line -match "ERROR") {
                    Write-Host "  $line" -ForegroundColor Red
                } elseif ($line -match "WARN") {
                    Write-Host "  $line" -ForegroundColor Yellow
                } elseif ($line -match "任务完成|工具|写入文件") {
                    Write-Host "  $line" -ForegroundColor Green
                } else {
                    Write-Host "  $line" -ForegroundColor Gray
                }
            }

            Write-Host ""
            $lastLogSize = $currentLogSize
        }
    }

    # 检查新文件
    $currentFileCount = Get-FileCount
    if ($currentFileCount -gt $lastFileCount) {
        $newFiles = $currentFileCount - $lastFileCount
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] 发现 $newFiles 个新文件！" -ForegroundColor Green
        Write-Host ""

        # 列出最新的文件
        Get-ChildItem -Path $WorkspacePath -Include "*.js","*.cjs" -Recurse -ErrorAction SilentlyContinue |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First $newFiles |
        ForEach-Object {
            Write-Host "  $($_.FullName.Replace($WorkspacePath, ''))" -ForegroundColor Cyan
        }

        Write-Host ""
        $lastFileCount = $currentFileCount
    }

    # 检查 git 提交
    try {
        $currentCommit = git -C "E:\goudan-langchain" log --oneline -1 2>$null
        if ($currentCommit -ne $prevCommit -and $prevCommit -ne "") {
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] 新的 Git 提交: $currentCommit" -ForegroundColor Green
            Write-Host ""
            $prevCommit = $currentCommit
        }
    } catch {
        # 忽略 git 错误
    }

    # 等待后再次检查
    Start-Sleep -Seconds $CheckInterval
}
