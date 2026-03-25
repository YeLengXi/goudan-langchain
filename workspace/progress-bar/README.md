# CLI进度条工具

这是一个用于显示长时间运行任务的进度的命令行工具。

## 安装

首先，你需要安装Node.js和npm（Node.js包管理器）。

然后，将此项目克隆到你的本地机器：

```bash
git clone https://github.com/your-username/progress-bar-cli.git

cd progress-bar-cli

npm install
```

## 使用

运行以下命令来使用进度条工具：

```bash
node demo.js --style standard

node demo.js --style dots

node demo.js --multi
```

## 参数

- `--style`：指定进度条样式（可选，默认为'standard'）

- `--multi`：创建多个进度条

## 示例

```bash
Processing files...
[████████████░░░░░░░░░] 60% | ETA: 0:00:05 | 12/20 files | 2.4 files/s
```