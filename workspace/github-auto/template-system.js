const fs = require('fs');const path = require('path');const { promisify } = require('util');const exec = promisify(exec);const read_file = require('./read_file');const write_file = require('./write_file');const list_directory = require('./list_directory');const exec_command = require('./exec_command');class TemplateSystem {
  constructor() {
    this.templates = {
      'README': fs.readFileSync(path.join(__dirname, 'templates', 'README.md'), 'utf8'),
      '.gitignore': {
        'nodejs': fs.readFileSync(path.join(__dirname, 'templates', '.gitignore.nodejs'), 'utf8'),
        'python': fs.readFileSync(path.join(__dirname, 'templates', '.gitignore.python'), 'utf8')
      },
      'LICENSE': {
        'MIT': fs.readFileSync(path.join(__dirname, 'templates', 'LICENSE.MIT'), 'utf8'),
        'Apache': fs.readFileSync(path.join(__dirname, 'templates', 'LICENSE.Apache'), 'utf8'),
        'GPL': fs.readFileSync(path.join(__dirname, 'templates', 'LICENSE.GPL'), 'utf8')
      }
    };
  }

  getTemplate(name, type) {
    return this.templates[name][type] || null;
  }
}

module.exports = TemplateSystem;