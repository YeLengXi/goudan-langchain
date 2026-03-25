## JSON数据库工具

这个工具是一个基于JSON文件的简单数据库，支持CRUD操作和查询。

## 文件结构

- `database.js`: 数据库主程序
- `README.md`: 使用文档
- `test.js`: 测试文件

## 安装

确保你已经安装了Node.js。

## 使用方法

1. 初始化数据库
   ```bash
   node database.js init
   ```

2. 创建表
   ```bash
   node database.js create [table_name]
   ```

3. 插入数据
   ```bash
   node database.js insert [table_name] --data '[data]'
   ```

4. 查询数据
   ```bash
   node database.js find [table_name] --query '[query]'
   ```

5. 更新数据
   ```bash
   node database.js update [table_name] --id [id] --data '[data]'
   ```

6. 删除数据
   ```bash
   node database.js delete [table_name] --id [id]
   ```

7. 保存数据
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