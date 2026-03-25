# 任务7: JSON数据处理工具

## 目标

创建一个JSON数据处理工具，可以格式化、排序、过滤JSON数据。

## 必须创建的文件

1. `workspace/json-tools/json-tools.js` - 主程序
2. `workspace/json-tools/README.md` - 使用说明

## 工作流程

立即执行以下操作：
1. 创建JSON处理函数：
   - format(json, indent): 格式化JSON
   - sort(json, key): 按键值排序
   - filter(json, condition): 过滤数据
   - merge(json1, json2): 合并JSON
2. 支持从文件读取JSON
3. 支持命令行参数
4. 添加使用示例

## 功能要求

- 格式化：美化JSON输出
- 排序：按字母或数值排序
- 过滤：支持条件表达式
- 合并：深度合并对象
- 错误处理：无效JSON

## CLI接口

```bash
node json-tools.js format input.json
node json-tools.js sort input.json --key name
node json-tools.js filter input.json --condition "age > 18"
```

## 重要

- 使用Node.js内置模块
- 包含错误处理
- 添加详细注释
- 提供使用示例
