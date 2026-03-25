const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

class DB {
  constructor(file_path) {
    this.file_path = file_path;
    this.data = {};
    this.tables = {};
  }

  async init() {
    try {
      const data = await readFile(this.file_path, { encoding: 'utf-8' });
      this.data = JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await mkdir(path.dirname(this.file_path), { recursive: true });
        this.data = {};
      } else {
        throw error;
      }
    }
  }

  async createTable(table_name) {
    if (!this.data.tables) {
      this.data.tables = {};
    }
    if (!this.data.tables[table_name]) {
      this.data.tables[table_name] = [];
    }
  }

  async insert(table_name, data) {
    if (!this.data.tables[table_name]) {
      await this.createTable(table_name);
    }
    const record = { ...data, id: Date.now() };
    this.data.tables[table_name].push(record);
  }

  async find(table_name, query) {
    if (!this.data.tables[table_name]) {
      return [];
    }
    return this.data.tables[table_name].filter(record => {
      return Object.keys(query).every(key => record[key] === query[key]);
    });
  }

  async update(table_name, id, data) {
    if (!this.data.tables[table_name]) {
      return;
    }
    const index = this.data.tables[table_name].findIndex(record => record.id === id);
    if (index !== -1) {
      this.data.tables[table_name][index] = { ...this.data.tables[table_name][index], ...data };
    }
  }

  async delete(table_name, id) {
    if (!this.data.tables[table_name]) {
      return;
    }
    this.data.tables[table_name] = this.data.tables[table_name].filter(record => record.id !== id);
  }

  async save() {
    await writeFile(this.file_path, JSON.stringify(this.data, null, 2));
  }
}

module.exports = DB;