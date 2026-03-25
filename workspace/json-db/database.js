  throw new Error('Table does not exist');
    }
    const record = this.tables[table_name].find(r => r.id === id);
    if (record) {
      Object.assign(record, data);
      await this.save();
    } else {
      throw new Error('Record not found');
    }
  }

  async delete(table_name, id) {
    if (!this.tables[table_name]) {
      throw new Error('Table does not exist');
    }
    this.tables[table_name] = this.tables[table_name].filter(r => r.id !== id);
    await this.save();
  }

  async save() {
    await writeFile(this.file_path, JSON.stringify(this.tables, null, 2), 'utf8');
  }

  generateId(table_name) {
    const table = this.tables[table_name];
    return table.length > 0 ? Math.max(...table.map(r => r.id)) + 1 : 1;
  }

  matchRecord(record, query) {
    return Object.keys(query).every(key => record[key] === query[key]);
  }
}

module.exports = DB;