# 任务11: CSV数据处理工具

## 目标

创建一个完整的CSV数据处理工具，可以读取、解析、转换和导出CSV文件。

## 必须创建的文件

1. `workspace/csv-tool/csv-tool.js` - 主程序
2. `workspace/csv-tool/README.md` - 使用文档
3. `workspace/csv-tool/package.json` - 项目配置

## 工作流程

立即执行以下操作：
1. 实现CSV解析器（支持引号、逗号、换行）
2. 实现CSV生成器
3. 实现数据转换功能：
   - CSV转JSON
   - CSV转Markdown表格
   - CSV转HTML表格
   - CSV过滤（按行/列）
   - CSV排序
4. 实现CLI接口
5. 添加使用示例

## 功能要求

- 读取CSV文件
- 解析复杂CSV（引号、转义）
- 转换多种格式
- 数据过滤和排序
- 导出功能
- 错误处理

## CLI接口

```bash
node csv-tool.js convert input.csv --format json
node csv-tool.js filter input.csv --column "status" --value "active"
node csv-tool.js sort input.csv --column "date"
node csv-tool.js to-table input.csv --format markdown
```

## 重要

- 使用Node.js内置模块
- 支持大文件（流式处理）
- 包含详细注释
- 提供测试示例
