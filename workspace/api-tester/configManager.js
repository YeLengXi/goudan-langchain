// Manage configuration
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const configPath = path.join(__dirname, '../config.json');

module.exports = {
  getConfig: () => {
    if (!fs.existsSync(configPath)) {
      fs.writeFileSync(configPath, '{}');n
      return {};
    }

    const config = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(config);
  },

  saveConfig: (config) => {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  }
}