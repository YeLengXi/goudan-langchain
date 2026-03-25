const fs = require('fs');
const path = require('path');

class DB {
  constructor(file_path) {
    this.file_path = file_path;
    this.tables = {};
    this.init();
  }

  init() {
    const data = fs.readFileSync(this.file_path, 'utf8');
    if (data) {
      this.tables = JSON.parse(data);
    }
  }

  createTable(table_name) {
    if (!this.tables[table_name]) {
      this.tables[table_name] = {
        records: [],
        next_id: 1
      };
      this.save();
    }
  }

  insert(table_name, record) {
    const table = this.tables[table_name];
    if (!table) {
      throw new Error('Table not found');
    }
    record.id = table.next_id++;
    table.records.push(record);
    this.save();
  }

  find(table_name, query) {
    const table = this.tables[table_name];
    if (!table) {
      throw new Error('Table not found');
    }
    return table.records.filter(record => this.match(record, query));
  }

  update(table_name, id, data) {
    const table = this.tables[table_name];
    if (!table) {
      throw new Error('Table not found');
    }
    const record = table.records.find(record => record.id === id);
    if (!record) {
      throw new Error('Record not found');
    }
    Object.assign(record, data);
    this.save();
  }

  delete(table_name, id) {
    const table = this.tables[table_name];
    if (!table) {
      throw new Error('Table not found');
    }
    table.records = table.records.filter(record => record.id !== id);
    this.save();
  }

  save() {
    fs.writeFileSync(this.file_path, JSON.stringify(this.tables, null, 2), 'utf8');
  }

  match(record, query) {
    return Object.keys(query).every(key => record[key] === query[key]);
  }
}

module.exports = DB;