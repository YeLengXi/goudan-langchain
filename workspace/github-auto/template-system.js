const { write_file, list_directory } = require('./utils');const { GitHubAPI } = require('./github-api');const README_TEMPLATES = {
  'default': 'defaultREADME.md',
  'nodejs': 'nodejsREADME.md'
};const GITIGNORE_TEMPLATES = {
  'default': 'default.gitignore',
  'nodejs': 'nodejs.gitignore'
};const LICENSES = {
  'MIT': 'MIT_LICENSE.txt',
  'Apache': 'APACHE_LICENSE.txt',
  'GPL': 'GPL_LICENSE.txt'
};

module.exports = {
  applyTemplate: async (templateType, repositoryName) => {
    const readmeContent = read_file(README_TEMPLATES[templateType]).trim();
    const gitignoreContent = read_file(GITIGNORE_TEMPLATES[templateType]).trim();
    const licenseContent = read_file(LICENSES[templateType]).trim();
    write_file(`./${repositoryName}/README.md`, readmeContent);
    write_file(`./${repositoryName}/.gitignore`, gitignoreContent);
    write_file(`./${repositoryName}/LICENSE`, licenseContent);
  }
};