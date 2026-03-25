# CLI进度条工具

## 简介
本工具提供命令行进度条功能，可以显示长时间运行任务的进度。

## 安装

```bash
npm install progress-bar
```

## 使用方法

### 创建单个进度条

```javascript
const ProgressBar = require('./progress.js');

const bar = new ProgressBar({ total: 100, width: 40, complete: '█', incomplete: '░' });

for (let i = 0; i <= 100; i++) {
  bar.update(i);
  // 做一些工作
}


### 创建多进度条

```javascript
const ProgressBar = require('./progress.js');

const multi = new ProgressBar.MultiProgressBar();

const bar1 = multi.create('Download', 100);
const bar2 = multi.create('Upload', 100);

for (let i = 0; i <= 100; i++) {
  bar1.update(i);
  bar2.update(i);
  // 做一些工作
}


## 参数

- total: 总进度数
- width: 进度条宽度
- complete: 完成部分的字符
- incomplete: 不完成部分的字符

## CLI接口

```bash
node demo.js --style standard
node demo.js --style dots
node demo.js --multi
```