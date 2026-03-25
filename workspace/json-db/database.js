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
  }

  async init() {
    const data = await readFile(this.file_path, 'utf8');
    this.tables = JSON.parse(data);
  }

  async createTable(table_name) {
    if (this.tables[table_name]) {
      throw new Error(`Table ${table_name} already exists.`);
    }
    this.tables[table_name] = [];
    await writeFile(this.file_path, JSON.stringify(this.tables), 'utf8');
  }

  async insert(table_name, record) {
    if (!this.tables[table_name]) {
      throw new Error(`Table ${table_name} does not exist.`);
    }
    record.id = Date.now();
    this.tables[table_name].push(record);
    await writeFile(this.file_path, JSON.stringify(this.tables), 'utf8');
  }

  async find(table_name, query) {
    if (!this.tables[table_name]) {
      throw new Error(`Table ${table_name} does not exist.`);
    }
    return this.tables[table_name].filter(record => {
      return Object.keys(query).every(key => record[key] === query[key]);
    });
  }

  async update(table_name, id, data) {
    if (!this.tables[table_name]) {
      throw new Error(`Table ${table_name} does not exist.`);
    }
    const index = this.tables[table_name].findIndex(record => record.id === id);
    if (index === -1) {
      throw new Error(`Record with id ${id} not found in table ${table_name}.`);
    }
    Object.assign(this.tables[table_name][index], data);
    await writeFile(this.file_path, JSON.stringify(this.tables), 'utf8');
  }

  async delete(table_name, id) {
    if (!this.tables[table_name]) {
      throw new Error(`Table ${table_name} does not exist.`);
    }
    const index = this.tables[table_name].findIndex(record => record.id === id);
    if (index === -1) {
      throw new Error(`Record with id ${id} not found in table ${table_name}.`);
    }
    this.tables[table_name].splice(index, 1);
    await writeFile(this.file_path, JSON.stringify(this.tables), 'utf8');
  }

  async save() {
    await writeFile(this.file_path, JSON.stringify(this.tables), 'utf8');
  }
}

module.exports = DB;