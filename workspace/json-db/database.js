# 数据库主程序

const fs = require('fs');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const appendFile = util.promisify(fs.appendFile);

class DB {
  constructor(filePath) {
    this.filePath = filePath;
    this.tables = {};
    this.init();
  }

  async init() {
    const data = await readFile(this.filePath, 'utf8');
    if (data) {
      this.tables = JSON.parse(data);
    }
  }

  async createTable(tableName) {
    if (!this.tables[tableName]) {
      this.tables[tableName] = [];
      await writeFile(this.filePath, JSON.stringify(this.tables), 'utf8');
    }
  }

  async insert(tableName, record) {
    const table = this.tables[tableName];
    record.id = table.length + 1;
    table.push(record);
    await writeFile(this.filePath, JSON.stringify(this.tables), 'utf8');
  }

  async find(tableName, query) {
    const table = this.tables[tableName];
    return table.filter(record => {
      return Object.keys(query).every(key => record[key] === query[key]);
    });
  }

  async update(tableName, id, data) {
    const table = this.tables[tableName];
    const index = table.findIndex(record => record.id === id);
    if (index !== -1) {
      table[index] = { ...table[index], ...data };
      await writeFile(this.filePath, JSON.stringify(this.tables), 'utf8');
    }
  }

  async delete(tableName, id) {
    const table = this.tables[tableName];
    const index = table.findIndex(record => record.id === id);
    if (index !== -1) {
      table.splice(index, 1);
      await writeFile(this.filePath, JSON.stringify(this.tables), 'utf8');
    }
  }

  async save() {
    await writeFile(this.filePath, JSON.stringify(this.tables), 'utf8');
  }
}

module.exports = DB;