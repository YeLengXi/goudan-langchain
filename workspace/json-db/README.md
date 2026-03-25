## README.md

欢迎使用JSON数据库工具！

以下是该工具的基本使用说明：

### 初始化数据库

```bash
node database.js init
```

### 创建表

```bash
node database.js create [table_name]
```

### 插入记录

```bash
node database.js insert [table_name] --data '[{\"key\":\"value\"}]'
```

### 查询记录

```bash
node database.js find [table_name] --query '[{\"key\":\"value\"}]'
```

### 更新记录

```bash
node database.js update [table_name] --id [id] --data '[{\"key\":\"value\"}]'
```

### 删除记录

```bash
node database.js delete [table_name] --id [id]
```

### 保存数据库

```bash
node database.js save
```

### 使用示例

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