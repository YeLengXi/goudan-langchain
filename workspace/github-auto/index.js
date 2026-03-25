const fs = require('fs');const path = require('path');const https = require('https');const { promisify } = require('util');const exec = promisify(exec);const read_file = require('./read_file');const write_file = require('./write_file');const list_directory = require('./list_directory');const exec_command = require('./exec_command');const GitHubAPI = require('./github-api');const TemplateSystem = require('./template-system');const CLI = require('./cli');const packageJson = require('./package.json');class GitHubAuto {
  constructor() {
    this.githubApi = new GitHubAPI();
    this.templateSystem = new TemplateSystem();
    this.cli = new CLI();
  }
}

module.exports = GitHubAuto;