const fs = require('fs');
const path = require('path');
const { apiUrl, gitUrl, personalAccessToken } = require('../config');
const axios = require('axios');

const templatesDir = path.join(__dirname, '../templates');

const readTemplate = (templateName) => {
  const templatePath = path.join(templatesDir, `${templateName}.md`);
  return fs.readFileSync(templatePath, 'utf8');
};

module.exports = {
  readTemplate
};