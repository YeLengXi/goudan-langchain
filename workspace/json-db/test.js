const DB = require('./database');
const fs = require('fs');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const appendFile = util.promisify(fs.appendFile);
const mkdir = util.promisify(fs.mkdir);
const stat = util.promisify(fs.stat);

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