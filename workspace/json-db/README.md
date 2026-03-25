## JSON数据库工具

本工具是一个基于JSON文件的简单数据库，支持CRUD操作和查询。

## 文件

1. database.js - 数据库主程序
2. README.md - 使用文档
3. test.js - 测试文件

## 安装

确保你已经安装了Node.js。

## 使用

1. 创建数据库
   node database.js create <table_name>
2. 插入记录
   node database.js insert <table_name> --data '<json_data>'
3. 查询记录
   node database.js find <table_name> --query '<json_query>'
4. 更新记录
   node database.js update <table_name> --id <record_id> --data '<json_data>'
5. 删除记录
   node database.js delete <table_name> --id <record_id>'

## 示例

1. 创建users表
   node database.js create users
2. 插入记录
   node database.js insert users --data '{\"name\":\"Alice\",\"age\":30}'
3. 查询记录
   node database.js find users --query '{\"age\":30}'
4. 更新记录
   node database.js update users --id 1 --data '{\"age\":31}'
5. 删除记录
   node database.js delete users --id 1

## 注意

- 表名必须是唯一的。
- 记录ID是自动生成的。
