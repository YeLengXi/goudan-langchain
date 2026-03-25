## JSON数据库工具

这个简单的数据库工具是基于JSON文件实现的，支持CRUD操作和查询。

## 文件结构

- `database.js` - 数据库主程序
- `README.md` - 使用文档
- `test.js` - 测试文件

## 安装

确保你已经安装了Node.js。

## 使用

1. 创建数据库文件：

   ```bash
   node database.js create <table_name>
   ```

2. 插入记录：

   ```bash
   node database.js insert <table_name> --data '<data>'
   ```

3. 查询记录：

   ```bash
   node database.js find <table_name> --query '<query>'
   ```

4. 更新记录：

   ```bash
   node database.js update <table_name> --id <id> --data '<data>'
   ```

5. 删除记录：

   ```bash
   node database.js delete <table_name> --id <id>
   ```

6. 保存数据库：

   ```bash
   node database.js save
   ```

## 示例

```javascript
const DB = require('./database');

// 初始化
const db = new DB('./data.json');

// 创建表
db.createTable('users');

// 插入
db.insert('users', { name: 'Alice', age: 30 });

// 查询
const users = db.find('users', { age: 30 });

// 更新
db.update('users', 1, { age: 31 });

// 删除
db.delete('users', 1);

// 保存
db.save();
```