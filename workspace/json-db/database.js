const fs = require('fs');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

class DB {
  constructor(file_path) {
    this.file_path = file_path;
    this.tables = {};
  }

  async init() {
    try {
      const data = await readFile(this.file_path, { encoding: 'utf-8' });
      this.tables = JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await mkdir(path.dirname(this.file_path), { recursive: true });
        this.tables = {};
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
    await this.save();
  }

  async insert(table_name, record) {
    if (!this.tables[table_name]) {
      throw new Error('Table does not exist.');
    }
    record.id = Date.now();
    this.tables[table_name].push(record);
    await this.save();
  }

  async find(table_name, query) {
    if (!this.tables[table_name]) {
      throw new Error('Table does not exist.');
    }
    return this.tables[table_name].filter(record => {
      return Object.keys(query).every(key => record[key] === query[key]);
    });
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
    await this.save();
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
    await this.save();
  }

  async save() {
    await writeFile(this.file_path, JSON.stringify(this.tables, null, 2), { encoding: 'utf-8' });
  }
}
