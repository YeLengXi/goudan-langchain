const { Transform } = require('stream');

// CSV解析器
class CSVParser extends Transform {
  constructor(options) {
    super(options);
    this.currentRow = [];
    this.currentField = '';
    this.rowIndex = 0;
    this.isQuoted = false;
  }

  _transform(chunk, encoding, callback) {
    let data = chunk.toString();

    for (let i = 0; i < data.length; i++) {
      const char = data[i];

      if (char === '\') {
        // 转义字符
        this.currentField += data[i + 1];
        i++;
      } else if (char === '"') {
        // 引号
        this.isQuoted = !this.isQuoted;
      } else if (char === ',' && !this.isQuoted) {
        // 字段分隔符
        this.push(this.currentRow.join(','));
        this.currentRow = [];
      } else if (char === '
' && !this.isQuoted) {
        // 行分隔符
        this.push(this.currentRow.join(','));
        this.currentRow = [];
        this.rowIndex++;
      } else {
        // 普通字符
        this.currentField += char;
      }
    }

    callback();
  }

  _flush(callback) {
    if (this.currentRow.length > 0) {
      this.push(this.currentRow.join(','));
    }
    callback();
  }
}

// CSV生成器
class CSVGenerator extends Transform {
  constructor(options) {
    super(options);
    this.header = [];
  }

  _transform(chunk, encoding, callback) {
    const row = chunk.toString().split(',');

    if (this.header.length === 0) {
      this.header = row;
    }

    this.push(this.header.join(','));
    this.push('
');
    this.push(row.join(','));
    this.push('
');

    callback();
  }
}

module.exports = { CSVParser, CSVGenerator };