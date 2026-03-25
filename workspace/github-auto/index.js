const fs = require('fs');
const axios = require('axios');
const { program } = require('commander');
const dotenv = require('dotenv').config();

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

program
  .version('1.0.0')
  .command('create <repoName> [isPrivate]')
  .description('Create a new GitHub repository')
  .option('--public', 'Create a public repository')
  .option('--private', 'Create a private repository')
  .action((repoName, isPrivate) => {
    const isPublic = isPrivate ? false : program.public;
    createRepository(repoName, isPublic);
  })
  .command('init [template]')
  .description('Initialize the local repository')
  .action((template) => {
    initializeRepository(template);
  })
  .command('push')
  .description('Push the local repository to GitHub')
  .action(() => {
    pushToGitHub();
  });

async function createRepository(repoName, isPublic) {
  try {
    const response = await axios.post(`${GITHUB_API_URL}/user/repos`, {
      name: repoName,
      private: isPublic
    }, {
      headers: {
        Authorization: `token ${GITHUB_ACCESS_TOKEN}`
      }
    });
    console.log('Repository created:', response.data.html_url);
  } catch (error) {
    console.error('Error creating repository:', error);
  }
}

async function initializeRepository(template) {
  // Initialize git
  // Create project structure
  // Add initial files
  // First commit
}

async function pushToGitHub() {
  // Add remote
  // Push to main branch
  // Set default branch
}
