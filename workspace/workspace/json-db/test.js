const fs = require('fs');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

class Test {
  constructor(db) {
    this.db = db;
  }

  async testCreateTable() {
    await this.db.createTable('users');
    const usersTable = await this.db.find('users', {});
    console.log('Test Create Table:', usersTable.length > 0 ? 'Passed' : 'Failed');
  }

  async testInsert() {
    await this.db.insert('users', { name: 'Alice', age: 30 });
    const usersTable = await this.db.find('users', {});
    console.log('Test Insert:', usersTable.length === 1 ? 'Passed' : 'Failed');
  }

  async testFind() {
    const usersTable = await this.db.find('users', { name: 'Alice' });
    console.log('Test Find:', usersTable.length === 1 ? 'Passed' : 'Failed');
  }

  async testUpdate() {
    await this.db.update('users', 1, { age: 31 });
    const usersTable = await this.db.find('users', { age: 31 });
    console.log('Test Update:', usersTable.length === 1 ? 'Passed' : 'Failed');
  }

  async testDelete() {
    await this.db.delete('users', 1);
    const usersTable = await this.db.find('users', {});
    console.log('Test Delete:', usersTable.length === 0 ? 'Passed' : 'Failed');
  }
}
