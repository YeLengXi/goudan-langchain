# CLI进度条工具

## 目标
创建一个命令行进度条工具，用于显示长时间运行任务的进度。

## 必须创建的文件
1. progress-bar/progress.js - 进度条主程序
2. progress-bar/README.md - 使用文档
3. progress-bar/demo.js - 演示程序

## 工作流程
立即执行以下操作：
1. 实现进度条显示：
   - 百分比显示
   - 进度条图形（[====>     ]）
   - ETA计算
   - 速度显示
2. 实现多种样式：
   - 标准进度条
   - 圆形进度
   - 点状进度（.....）
   - 箭头进度（>>>>）
3. 实现多进度条（同时显示多个）
4. 实现日志输出（不干扰进度条）
5. 添加使用示例

## 功能要求
- 动态更新
- 百分比显示
- ETA计算
- 支持多种样式
- 多进度条
- 彩色输出

## API接口
```javascript
const ProgressBar = require('./progress.js');

// 单个进度条
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

// 多进度条
const multi = new MultiProgressBar();
const bar1 = multi.create('Download', 100);
const bar2 = multi.create('Upload', 100);
```