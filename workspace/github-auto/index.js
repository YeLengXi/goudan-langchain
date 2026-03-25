const fs = require('fs');const path = require('path');const https = require('https');const { prompt } = require('inquirer');const github = require('@octokit/rest');const { exec } = require('child_process');const { read_file, write_file, exec_command, list_directory } = require('./utils');const config = require('./config');

// GitHub API Token
const GITHUB_TOKEN = config.get('GITHUB_TOKEN');

// Create GitHub repository
async function createRepository(name, isPublic, description) {
  const githubClient = new github({
    auth: GITHUB_TOKEN
  });

  try {
    const response = await githubClient.repos.create({
      name: name,
      private: !isPublic
    });

    if (description) {
      await githubClient.repos.update({
        owner: response.data.owner.login,
        repo: name,
        description: description
      });
    }

    await createReadmeTemplate(name, isPublic);
    await createGitignoreTemplate(name, isPublic);
    await createLicenseTemplate(name, isPublic);

    console.log(`Repository created: ${response.data.html_url}`);
  } catch (error) {
    console.error('Error creating repository:', error);
  }
}

// Create README template
async function createReadmeTemplate(name, isPublic) {
  const templatePath = path.join(__dirname, '../templates/README.md');
  const templateContent = await read_file(templatePath);
  const readmePath = path.join(__dirname, `../${name}/README.md`);

  await write_file(readmePath, templateContent);
}

// Create .gitignore template
async function createGitignoreTemplate(name, isPublic) {
  const templatePath = path.join(__dirname, '../templates/gitignore');
  const templateContent = await read_file(templatePath);
  const gitignorePath = path.join(__dirname, `../${name}/.gitignore`);

  await write_file(gitignorePath, templateContent);
}

// Create LICENSE template
async function createLicenseTemplate(name, isPublic) {
  const templatePath = path.join(__dirname, '../templates/LICENSE');
  const templateContent = await read_file(templatePath);
  const licensePath = path.join(__dirname, `../${name}/LICENSE`);

  await write_file(licensePath, templateContent);
}

// Initialize local repository
async function initLocalRepository(name) {
  const repoPath = path.join(__dirname, `../${name}`);
  await exec_command(`mkdir -p ${repoPath}`);
  await exec_command(`cd ${repoPath} && git init`);
  await createReadmeTemplate(name, isPublic);
  await createGitignoreTemplate(name, isPublic);
  await createLicenseTemplate(name, isPublic);
  await exec_command(`cd ${repoPath} && git add .`);
  await exec_command(`cd ${repoPath} && git commit -m 'Initial commit'`);
}

// Push to GitHub
async function pushToGitHub(name) {
  const repoPath = path.join(__dirname, `../${name}`);
  await exec_command(`cd ${repoPath} && git remote add origin https://github.com/${name}.git`);
  await exec_command(`cd ${repoPath} && git push -u origin main`);
}

// CLI commands
async function handleCreateCommand(args) {
  const name = args._[1];
  const isPublic = args.public;
  const description = args.description ? args.description[0] : null;

  await createRepository(name, isPublic, description);
}

async function handleInitCommand(args) {
  const name = args._[1];
  await initLocalRepository(name);
}

async function handlePushCommand(args) {
  const name = args._[1];
  await pushToGitHub(name);
}

// Main program
async function main() {
  const { command, args } = await prompt([
    {
      type: 'list',
      name: 'command',
      message: 'Choose a command:',
      choices: ['create', 'init', 'push']
    },
    {
      when: (answers) => answers.command === 'create',
      type: 'input',
      name: 'name',
      message: 'Enter repository name:'
    },
    {
      when: (answers) => answers.command === 'create',
      type: 'confirm',
      name: 'public',
      message: 'Is the repository public?'
    },
    {
      when: (answers) => answers.command === 'create' && answers.public,
      type: 'input',
      name: 'description',
      message: 'Enter repository description:'
    },
    {
      when: (answers) => answers.command === 'init',
      type: 'input',
      name: 'name',
      message: 'Enter repository name:'
    },
    {
      when: (answers) => answers.command === 'push',
      type: 'input',
      name: 'name',
      message: 'Enter repository name:'
    }
  ]);

  switch (command) {
    case 'create':
      await handleCreateCommand(args);
      break;
    case 'init':
      await handleInitCommand(args);
      break;
    case 'push':
      await handlePushCommand(args);
      break;
  }
}

main().catch(console.error);