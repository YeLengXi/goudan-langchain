const fs = require('fs');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const appendFile = util.promisify(fs.appendFile);

class DB {
  constructor(filePath) {
    this.filePath = filePath;
    this.data = this.load();
  }

  async load() {
    try {
      const data = await readFile(this.filePath, { encoding: 'utf8' });
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return {};
      } else {
        throw error;
      }
    }
  }

  async save() {
    await writeFile(this.filePath, JSON.stringify(this.data, null, 2), { encoding: 'utf8' });
  }

  async createTable(tableName) {
    if (!this.data.tables) {
      this.data.tables = {};
    }
    if (!this.data.tables[tableName]) {
      this.data.tables[tableName] = [];
    }
    await this.save();
  }

  async insert(tableName, record) {
    const table = this.data.tables[tableName];
    record.id = table.length + 1;
    table.push(record);
    await this.save();
  }

  async find(tableName, query) {
    const table = this.data.tables[tableName];
    return table.filter(record => this.matchRecord(record, query));
  }

  async update(tableName, id, data) {
    const table = this.data.tables[tableName];
    const index = table.findIndex(record => record.id === id);
    if (index !== -1) {
      table[index] = { ...table[index], ...data };
      await this.save();
    }
  }

  async delete(tableName, id) {
    const table = this.data.tables[tableName];
    const index = table.findIndex(record => record.id === id);
    if (index !== -1) {
      table.splice(index, 1);
      await this.save();
    }
  }

  matchRecord(record, query) {
    return Object.keys(query).every(key => record[key] === query[key]);
  }
}

module.exports = DB;