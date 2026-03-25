const axios = require('axios');const fs = require('fs');const path = require('path');const { exec } = require('child_process');const { prompt } = require('inquirer');const questions = [{
    type: 'input',
    name: 'repoName',
    message: 'Enter the repository name:'
  }, {
    type: 'list',
    name: 'visibility',
    message: 'Choose the repository visibility:',
    choices: ['public', 'private']
  }, {
    type: 'input',
    name: 'description',
    message: 'Enter the repository description (optional):',
    when: (answers) => answers.visibility === 'private'
  }, {
    type: 'input',
    name: 'token',
    message: 'Enter your GitHub Personal Access Token:'
  }],

async function createRepo() {
  const answers = await prompt(questions);
  const { repoName, visibility, description, token } = answers;

  const response = await axios.post('https://api.github.com/user/repos', {
    name: repoName,
    visibility: visibility,
    description: description
  }, {
    headers: {
      Authorization: `token ${token}`
    }
  });

  console.log('Repository created:', response.data.html_url);
}

module.exports = { createRepo };