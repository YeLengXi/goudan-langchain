const fs = require('fs');
const path = require('path');

class DB {
  constructor(file_path) {
    this.file_path = file_path;
    this.data = this.load();
  }

  load() {
    try {
      const content = fs.readFileSync(this.file_path, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      return {};
    }
  }

  save() {
    fs.writeFileSync(this.file_path, JSON.stringify(this.data, null, 2), 'utf8');
  }

  createTable(table_name) {
    if (!this.data.tables) {
      this.data.tables = {};
    }
    if (!this.data.tables[table_name]) {
      this.data.tables[table_name] = [];
    }
  }

  insert(table_name, record) {
    const table = this.data.tables[table_name];
    record.id = table.length + 1;
    table.push(record);
  }

  find(table_name, query) {
    const table = this.data.tables[table_name];
    return table.filter(record => this.matches(record, query));
  }

  update(table_name, id, data) {
    const table = this.data.tables[table_name];
    const index = table.findIndex(record => record.id === id);
    if (index !== -1) {
      table[index] = { ...table[index], ...data };
    }
  }

  delete(table_name, id) {
    const table = this.data.tables[table_name];
    const index = table.findIndex(record => record.id === id);
    if (index !== -1) {
      table.splice(index, 1);
    }
  }

  matches(record, query) {
    return Object.keys(query).every(key => {
      return record[key] === query[key];
    });
  }
}

module.exports = DB;