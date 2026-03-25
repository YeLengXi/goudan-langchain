const DB = require('./database');

const db = new DB('./data.json');

db.createTable('users');

db.insert('users', { name: 'Alice', age: 30 });

db.insert('users', { name: 'Bob', age: 25 });

db.find('users', { age: 30 });

db.update('users', 1, { age: 31 });

db.delete('users', 1);

db.save();