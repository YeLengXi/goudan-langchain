const { exec_command } = require('./utils');const { GitHubAPI } = require('./github-api');const { TemplateSystem } = require('./template-system');const { CLI } = require('./cli');

module.exports = {
  create: async (options) => {
    const { name, isPrivate, description } = options;
    const repository = await GitHubAPI.createRepository(name, isPrivate);
    await TemplateSystem.applyTemplate('default', name);
    exec_command(`git init ${name}`);
    exec_command(`git remote add origin ${repository.clone_url}`);
    exec_command(`git add .`);
    exec_command(`git commit -m 'Initial commit'`);
    exec_command(`git push -u origin main`);
  },

  init: async (options) => {
    const { template } = options;
    const repositoryName = 'my-project';
    await TemplateSystem.applyTemplate(template, repositoryName);
    exec_command(`git init ${repositoryName}`);
    exec_command(`echo 'Hello, world!' > ${repositoryName}/index.js`);
    exec_command(`git add .");
    exec_command(`git commit -m 'Initial commit' ${repositoryName}`);
  },

  push: async () => {
    const repositoryName = 'my-project';
    exec_command(`git push origin main ${repositoryName}`);
  }
};