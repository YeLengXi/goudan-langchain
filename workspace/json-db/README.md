## README

欢迎使用JSON数据库工具！

本工具基于JSON文件实现了一个简单的数据库，支持CRUD操作和查询。

## 安装

确保你已经安装了Node.js。

## 使用方法

1. 初始化数据库：
   node database.js init

2. 创建表：
   node database.js create <table_name>

3. 插入数据：
   node database.js insert <table_name> --data '<data>'

4. 查询数据：
   node database.js find <table_name> --query '<query>'

5. 更新数据：
   node database.js update <table_name> --id <id> --data '<data>'

6. 删除数据：
   node database.js delete <table_name> --id <id>'

7. 保存数据：
   node database.js save

## 示例

创建一个名为'users'的表：
   node database.js create users

插入一条数据：
   node database.js insert users --data '{\"name\":\"Alice\",\"age\":30}'

查询年龄为30的用户：
   node database.js find users --query '{\"age\":30}'

更新id为1的用户的年龄：
   node database.js update users --id 1 --data '{\"age\":31}'

删除id为1的用户：
   node database.js delete users --id 1

保存数据：
   node database.js save