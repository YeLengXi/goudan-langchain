## JSON数据库工具

这是一个简单的基于JSON文件的数据库，支持CRUD操作和查询。

### 安装

确保你已经安装了Node.js。

### 使用

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

### 示例

1. 创建数据库：
   ```bash
   node database.js init
   ```

2. 创建表：
   ```bash
   node database.js create users
   ```

3. 插入记录：
   ```bash
   node database.js insert users --data '{\"name\":\"Alice\",\"age\":30}'
   ```

4. 查询记录：
   ```bash
   node database.js find users --query '{\"age\":30}'
   ```

5. 更新记录：
   ```bash
   node database.js update users --id 1 --data '{\"age\":31}'
   ```

6. 删除记录：
   ```bash
   node database.js delete users --id 1
   ```

7. 保存数据库：
   ```bash
   node database.js save
   ```
