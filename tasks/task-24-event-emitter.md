# 任务24：增强型事件发射器

创建一个增强版的事件发射器（EventEmitter）。

## 功能要求

1. 基础功能（继承Node.js EventEmitter）
   - on/emit/off
   - once（只触发一次）
   - removeAllListeners

2. 增强功能
   - 事件命名空间（支持`user:*`通配符）
   - 异步事件处理
   - 事件拦截器（middleware）
   - 事件历史记录
   - 错误处理机制

3. 高级特性
   ```javascript
   const emitter = new EnhancedEventEmitter({
     maxListeners: 100,
     enableHistory: true,
     enableWildcard: true
   });

   // 使用命名空间
   emitter.on('user:*', (data) => {
     console.log('User event:', data);
   });

   // 使用拦截器
   emitter.use(async (event, data, next) => {
     console.log('Before:', event);
     await next();
     console.log('After:', event);
   });
   ```

4. 性能优化
   - 事件去重
   - 批量触发
   - 内存管理

## 输出要求

- 创建目录: `workspace/event-emitter`
- 包含完整的源代码
- 包含README文档
- 包含使用示例
- 代码要有注释

## 测试要求

创建测试脚本演示各种事件功能。
