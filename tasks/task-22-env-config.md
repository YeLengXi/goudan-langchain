# 任务22：环境配置管理工具

创建一个管理环境配置的工具。

## 功能要求

1. 支持多种配置文件格式
   - .env文件
   - JSON配置
   - YAML配置

2. 核心功能
   - 读取配置文件
   - 写入配置文件
   - 验证配置项
   - 加密敏感配置
   - 配置项类型检查

3. 提供CLI工具
   ```bash
   node config.js get DATABASE_URL
   node config.js set API_KEY=xxx
   node config.js validate
   ```

4. 安全特性
   - 敏感配置加密存储
   - 支持.env.example模板
   - 配置版本管理

## 输出要求

- 创建目录: `workspace/config-manager`
- 包含完整的源代码
- 包含README文档
- 包含示例.env文件
- 代码要有注释

## 测试要求

创建示例配置文件和测试脚本。
