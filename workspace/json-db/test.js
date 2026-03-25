const DB = require('./database');

const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const appendFile = util.promisify(fs.appendFile);
const mkdir = util.promisify(fs.mkdir);
const stat = util.promisify(fs.stat);

class TestDB {
  constructor(file_path) {
    this.file_path = file_path;
    this.db = new DB(this.file_path);
  }

  async run() {
    await this.db.init();

    // Create table
    await this.db.createTable('users');

    // Insert
    await this.db.insert('users', { name: 'Alice', age: 30 });
    await this.db.insert('users', { name: 'Bob', age: 25 });

    // Find
    const users = await this.db.find('users', { age: 25 });
    console.log('Find:', users);

    // Update
    await this.db.update('users', 1, { age: 26 });

    // Delete
    await this.db.delete('users', 1);

    // Save
    await this.db.save();
  }
}

const testDB = new TestDB('./data.json');
testDB.run().then(() => {
  console.log('Test completed.');
}).catch(error => {
  console.error('Test failed:', error);
});