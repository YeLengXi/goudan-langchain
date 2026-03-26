# 任务23：API限流工具

创建一个API请求限流工具。

## 功能要求

1. 支持多种限流算法
   - 固定窗口（Fixed Window）
   - 滑动窗口（Sliding Window）
   - 令牌桶（Token Bucket）
   - 漏桶（Leaky Bucket）

2. 核心功能
   - 限制请求速率
   - 记录请求统计
   - 支持分布式限流（使用Redis）
   - 自定义限流规则

3. 提供简单API
   ```javascript
   const limiter = new RateLimiter({
     windowMs: 60 * 1000, // 1分钟
     maxRequests: 100     // 最多100次请求
   });

   if (await limiter.check(userId)) {
     // 允许请求
   } else {
     // 拒绝请求
   }
   ```

4. 额外特性
   - 支持多种key类型（IP、用户ID、API key）
   - 限流事件回调
   - 统计信息导出

## 输出要求

- 创建目录: `workspace/rate-limiter`
- 包含完整的源代码
- 包含README文档
- 包含使用示例
- 代码要有注释

## 测试要求

创建测试脚本演示各种限流算法。
