# 任务15: JSON数据库工具

## 目标

创建一个基于JSON文件的简单数据库，支持CRUD操作和查询。

## 必须创建的文件

1. `workspace/json-db/database.js` - 数据库主程序
2. `workspace/json-db/README.md` - 使用文档
3. `workspace/json-db/test.js` - 测试文件

## 工作流程

立即执行以下操作：
1. 实现数据库结构：
   - 表（Tables）
   - 记录（Records）
   - 主键（Primary Key）
   - 索引（Indexes）
2. 实现CRUD操作：
   - Create: 插入记录
   - Read: 查询记录
   - Update: 更新记录
   - Delete: 删除记录
3. 实现查询功能：
   - find（条件查询）
   - filter（过滤）
   - sort（排序）
   - limit/offset（分页）
4. 实现持久化（保存到JSON文件）
5. 实现CLI接口
6. 添加使用示例

## 功能要求

- 支持多个表
- 自动生成ID
- 条件查询
- 数据验证
- 事务支持（简单）
- 错误处理

## API接口

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

## CLI接口

```bash
node database.js create users
node database.js insert users --data '{"name":"Bob","age":25}'
node database.js find users --query '{"age":25}'
node database.js update users --id 1 --data '{"age":31}'
node database.js delete users --id 1
```

## 重要

- 使用Node.js内置模块
- 支持嵌套查询
- 包含数据验证
- 添加详细注释
- 提供完整示例
