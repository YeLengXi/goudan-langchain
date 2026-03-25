const axios = require('axios');const fs = require('fs');const path = require('path');const { read_file, write_file, exec_command, list_directory } = require('./utils.js');const program = require('commander');require('dotenv').config();

const createGitHubRepo = async (token, name, isPublic, description) => {
  try {
    const response = await axios.post('https://api.github.com/user/repos', {
      name,
      private: !isPublic,
      description
    }, {
      headers: {
        'Authorization': `token ${token}
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating GitHub repo:', error);
    throw error;
  }
};

program
  .command('create <name> [options]')
  .description('创建 GitHub 仓库')
  .option('--public', '创建公开仓库', false)
  .option('--private', '创建私有仓库', false)
  .option('--description <description>', '仓库描述', '')
  .action(async (name, options) => {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      console.error('GitHub token is required. Please set GITHUB_TOKEN in your environment variables.');
      process.exit(1);
    }
    try {
      const repo = await createGitHubRepo(token, name, options.public, options.description);
      console.log(`Repository created: ${repo.html_url}`);
    } catch (error) {
      console.error('Failed to create GitHub repo:', error);
    }
  });

program.parse(process.argv);