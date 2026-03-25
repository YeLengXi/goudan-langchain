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
    this.init();
  }

  async init() {
    try {
      const data = await readFile(this.file_path, { encoding: 'utf8' });
      this.tables = JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await mkdir(path.dirname(this.file_path), { recursive: true });
        await writeFile(this.file_path, '{}', { encoding: 'utf8' });
      } else {
        throw error;
      }
    }
  }

  async createTable(table_name) {
    if (this.tables[table_name]) {
      throw new Error('Table already exists.');
    }
    this.tables[table_name] = [];
    await writeFile(this.file_path, JSON.stringify(this.tables), { encoding: 'utf8' });
  }

  async insert(table_name, record) {
    if (!this.tables[table_name]) {
      throw new Error('Table does not exist.');
    }
    record.id = this.generateId(table_name);
    this.tables[table_name].push(record);
    await writeFile(this.file_path, JSON.stringify(this.tables), { encoding: 'utf8' });
  }

  async find(table_name, query) {
    if (!this.tables[table_name]) {
      throw new Error('Table does not exist.');
    }
    return this.tables[table_name].filter(record => this.matchesQuery(record, query));
  }

  async update(table_name, id, data) {
    if (!this.tables[table_name]) {
      throw new Error('Table does not exist.');
    }
    const index = this.tables[table_name].findIndex(record => record.id === id);
    if (index === -1) {
      throw new Error('Record not found.');
    }
    Object.assign(this.tables[table_name][index], data);
    await writeFile(this.file_path, JSON.stringify(this.tables), { encoding: 'utf8' });
  }

  async delete(table_name, id) {
    if (!this.tables[table_name]) {
      throw new Error('Table does not exist.');
    }
    const index = this.tables[table_name].findIndex(record => record.id === id);
    if (index === -1) {
      throw new Error('Record not found.');
    }
    this.tables[table_name].splice(index, 1);
    await writeFile(this.file_path, JSON.stringify(this.tables), { encoding: 'utf8' });
  }

  async save() {
    await writeFile(this.file_path, JSON.stringify(this.tables), { encoding: 'utf8' });
  }

  generateId(table_name) {
    const table = this.tables[table_name];
    return table.length > 0 ? Math.max(...table.map(record => record.id)) + 1 : 1;
  }

  matchesQuery(record, query) {
    return Object.keys(query).every(key => record[key] === query[key]);
  }
}

module.exports = DB;