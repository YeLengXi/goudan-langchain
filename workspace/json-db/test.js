const DB = require('./database');

// 初始化数据库
const db = new DB('./data.json');

// 创建表
db.createTable('users');

// 插入
const user = { name: 'Alice', age: 30 }
db.insert('users', user);

// 查询
const users = db.find('users', { age: 30 });
console.log(users);

// 更新
const updatedUser = { ...user, age: 31 }
db.update('users', user.id, updatedUser);

// 删除
db.delete('users', user.id);

// 保存
db.save();