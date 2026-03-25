  const fs = require('fs');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const appendFile = util.promisify(fs.appendFile);
const mkdir = util.promisify(fs.mkdir);
const stat = util.promisify(fs.stat);

class DB {
  constructor(file_path) {
    this.file_path = file_path;
    this.tables = {};
    this.initialize();
  }

  async initialize() {
    try {
      const data = await readFile(this.file_path, 'utf8');
      this.tables = JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await mkdir(path.dirname(this.file_path), { recursive: true });
        await writeFile(this.file_path, '{}', 'utf8');
      } else {
        throw error;
      }
    }
  }

  async createTable(table_name) {
    if (!this.tables[table_name]) {
      this.tables[table_name] = [];
      await this.save();
    }
  }

  async insert(table_name, record) {
    if (!this.tables[table_name]) {
      throw new Error('Table does not exist');
    }
    record.id = this.generateId(table_name);
    this.tables[table_name].push(record);
    await this.save();
  }

  async find(table_name, query) {
    if (!this.tables[table_name]) {
      throw new Error('Table does not exist');
    }
    return this.tables[table_name].filter(record => this.matchesQuery(record, query));
  }

  async update(table_name, id, data) {
    if (!this.tables[table_name]) {
      throw new Error('Table does not exist');
    }
    const index = this.tables[table_name].findIndex(record => record.id === id);
    if (index === -1) {
      throw new Error('Record not found');
    }
    Object.assign(this.tables[table_name][index], data);
    await this.save();
  }

  async delete(table_name, id) {
    if (!this.tables[table_name]) {
      throw new Error('Table does not exist');
    }
    const index = this.tables[table_name].findIndex(record => record.id === id);
    if (index === -1) {
      throw new Error('Record not found');
    }
    this.tables[table_name].splice(index, 1);
    await this.save();
  }

  async save() {
    await writeFile(this.file_path, JSON.stringify(this.tables, null, 2), 'utf8');
  }

  generateId(table_name) {
    let max_id = 0;
    this.tables[table_name].forEach(record => {
      if (record.id > max_id) {
        max_id = record.id;
      }
    });
    return max_id + 1;
  }

  matchesQuery(record, query) {
    return Object.keys(query).every(key => record[key] === query[key]);
  }
}

module.exports = DB;