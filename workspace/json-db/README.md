## JSON数据库工具

这是一个基于JSON文件的简单数据库，支持CRUD操作和查询。

## 文件结构

- `database.js` - 数据库主程序
- `README.md` - 使用文档
- `test.js` - 测试文件

## 使用方法

1. 初始化数据库：

   ```bash
   node database.js init
   ```

2. 创建表：

   ```bash
   node database.js create <table_name>
   ```

3. 插入记录：

   ```bash
   node database.js insert <table_name> --data '<data>'
   ```

4. 查询记录：

   ```bash
   node database.js find <table_name> --query '<query>'
   ```

5. 更新记录：

   ```bash
   node database.js update <table_name> --id <id> --data '<data>'
   ```

6. 删除记录：

   ```bash
   node database.js delete <table_name> --id <id>
   ```

7. 保存数据库：

   ```bash
   node database.js save
   ```

## 示例

- 创建一个名为`users`的表：

   ```bash
   node database.js create users
   ```

- 插入一条记录：

   ```bash
   node database.js insert users --data '{\"name\":\"Alice\",\"age\":30}'
   ```

- 查询年龄为30的用户：

   ```bash
   node database.js find users --query '{\"age\":30}'
   ```

- 更新用户ID为1的年龄：

   ```bash
   node database.js update users --id 1 --data '{\"age\":31}'
   ```

- 删除用户ID为1的记录：

   ```bash
   node database.js delete users --id 1
   ```

- 保存数据库：

   ```bash
   node database.js save
   ```