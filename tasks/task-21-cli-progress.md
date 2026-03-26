# 任务21：CLI进度条工具

创建一个命令行进度条工具库。

## 功能要求

1. 支持多种进度条样式
   - 标准进度条: `[=======>     ] 60%`
   - 点状进度条: `.......`
   - 旋转动画: `| / - \`

2. 支持以下特性
   - 自定义颜色
   - 显示ETA（预计剩余时间）
   - 显示速度
   - 支持多行进度条

3. 提供简单的API
   ```javascript
   const progress = new ProgressBar('下载中', {
     total: 100,
     width: 40,
     complete: '=',
     incomplete: ' '
   });

   progress.tick(10);
   ```

4. 创建示例代码展示用法

## 输出要求

- 创建目录: `workspace/progress-bar-cli`
- 包含完整的源代码
- 包含README文档
- 包含使用示例
- 代码要有注释

## 测试要求

创建一个test.js文件，演示各种进度条样式。
