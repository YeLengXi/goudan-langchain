## JSON数据库工具

这是一个简单的基于JSON文件的数据库工具，支持CRUD操作和查询。

### 安装

确保你已经安装了Node.js。

### 使用方法

1. 初始化数据库：

   ```bash
   node database.js init
   ```

2. 创建表：

   ```bash
   node database.js create <table_name>
   ```

3. 插入数据：

   ```bash
   node database.js insert <table_name> --data '<data>'
   ```

4. 查询数据：

   ```bash
   node database.js find <table_name> --query '<query>'
   ```

5. 更新数据：

   ```bash
   node database.js update <table_name> --id <id> --data '<data>'
   ```

6. 删除数据：

   ```bash
   node database.js delete <table_name> --id <id>
   ```

7. 保存数据：

   ```bash
   node database.js save
   ```

### 示例

1. 创建表：

   ```bash
   node database.js create users
   ```

2. 插入数据：

   ```bash
   node database.js insert users --data '{\"name\":\"Alice\",\"age\":30}'
   ```

3. 查询数据：

   ```bash
   node database.js find users --query '{\"age\":30}'
   ```

4. 更新数据：

   ```bash
   node database.js update users --id 1 --data '{\"age\":31}'
   ```

5. 删除数据：

   ```bash
   node database.js delete users --id 1
   ```

6. 保存数据：

   ```bash
   node database.js save
   ```

