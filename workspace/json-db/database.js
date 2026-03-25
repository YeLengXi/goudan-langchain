  }

  async delete(table_name, id) {
    if (!this.tables[table_name]) {
      throw new Error('Table does not exist');
    }
    this.tables[table_name] = this.tables[table_name].filter(record => record.id !== id);
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

  match(record, query) {
    return Object.keys(query).every(key => record[key] === query[key]);
  }
}

module.exports = DB;