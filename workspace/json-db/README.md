## README.md

欢迎使用 JSON 数据库工具！

本工具基于 JSON 文件实现了一个简单的数据库，支持 CRUD 操作和查询。

### 安装

确保您已安装 Node.js。

### 使用方法

1. 创建数据库文件：
   
   ```bash
   node database.js init
   ```

2. 创建表：
   
   ```bash
   node database.js create <table_name>
   ```

3. 插入数据：
   
   ```bash
   node database.js insert <table_name> --data '<json_data>'
   ```

4. 查询数据：
   
   ```bash
   node database.js find <table_name> --query '<json_query>'
   ```

5. 更新数据：
   
   ```bash
   node database.js update <table_name> --id <id> --data '<json_data>'
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

创建数据库文件：

```bash
node database.js init
```

创建表：

```bash
node database.js create users
```

插入数据：

```bash
node database.js insert users --data '{\"name\":\"Alice\",\"age\":30}'
```

查询数据：

```bash
node database.js find users --query '{\"age\":30}'
```

更新数据：

```bash
node database.js update users --id 1 --data '{\"age\":31}'
```

删除数据：

```bash
node database.js delete users --id 1
```

保存数据：

```bash
node database.js save
```