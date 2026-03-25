const axios = require('axios');
const dotenv = require('dotenv');
const { program } = require('commander');
const fs = require('fs');
const path = require('path');

dotenv.config();

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

program
  .command('create <repoName> [isPrivate] [description]')
  .description('Create a new GitHub repository')
  .action((repoName, isPrivate, description) => {
    createRepository(repoName, isPrivate, description);
  });

program
  .command('init [template]')
  .description('Initialize a new project')
  .action((template) => {
    initializeProject(template);
  });

program
  .command('push')
  .description('Push the current project to GitHub')
  .action(() => {
    pushToGitHub();
  });

program.parse(process.argv);

async function createRepository(repoName, isPrivate, description) {
  try {
    const response = await axios.post(`${GITHUB_API_URL}/user/repos`, {
      name: repoName,
      private: isPrivate || false,
      description: description || '',
    }, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    console.log(`Repository created: ${response.data.html_url}`);
  } catch (error) {
    console.error('Error creating repository:', error);
  }
}

async function initializeProject(template) {
  const projectPath = path.join(__dirname, '..', 'projects', repoName);
  fs.mkdirSync(projectPath, { recursive: true });

  const files = {
    'README.md': require.resolve('./templates/README.md'),
    '.gitignore': require.resolve('./templates/gitignore'),
    'LICENSE': require.resolve('./templates/LICENSE'),
  };

  for (const [file, templatePath] of Object.entries(files)) {
    const content = fs.readFileSync(templatePath, 'utf-8');
    fs.writeFileSync(path.join(projectPath, file), content);
  }

  console.log(`Project initialized in ${projectPath}`);
}

async function pushToGitHub() {
  // Implementation for pushing to GitHub
  console.log('Pushing to GitHub...');
}
