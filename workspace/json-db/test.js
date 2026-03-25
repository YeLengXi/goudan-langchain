# 测试文件

const DB = require('./database');

const db = new DB('./data.json');

// 创建表
console.log('Creating table users...');
await db.createTable('users');
console.log('Table users created.');

// 插入
console.log('Inserting record...');
await db.insert('users', { name: 'Alice', age: 30 });
console.log('Record inserted.');

// 查询
console.log('Finding records...');
const users = await db.find('users', { age: 30 });
console.log('Records found:', users);

// 更新
console.log('Updating record...');
await db.update('users', 1, { age: 31 });
console.log('Record updated.');

// 删除
console.log('Deleting record...');
await db.delete('users', 1);
console.log('Record deleted.');

// 保存
console.log('Saving database...');
await db.save();
console.log('Database saved.');