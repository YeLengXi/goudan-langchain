# CLI进度条工具

## 目标
创建一个命令行进度条工具，用于显示长时间运行任务的进度。

## 安装

```bash
npm install
```

## 使用

### 创建单个进度条

```javascript
const ProgressBar = require('./progress.js');

const bar = new ProgressBar({
  total: 100,
  width: 40,
  complete: '█',
  incomplete: '░'
});

for (let i = 0; i <= 100; i++) {
  bar.update(i);
  // 做一些工作
}

```

### 创建多个进度条

```javascript
const ProgressBar = require('./progress.js');

const multi = new MultiProgressBar();
const bar1 = multi.create('Download', 100);
const bar2 = multi.create('Upload', 100);

for (let i = 0; i <= 100; i++) {
  bar1.update(i);
  bar2.update(i);
  // 做一些工作
}

```

## 示例

```bash
node demo.js --style standard
node demo.js --style dots
node demo.js --multi
```