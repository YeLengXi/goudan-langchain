# init.js

const fs = require('fs');
const path = require('path');
const { prompt } = require('enquirer');

const initRepo = async () => {
  const template = await prompt([
    {
      type: 'list',
      name: 'template',
      message: '选择模板:',
      choices: ['nodejs', 'python', 'typescript']
    }
  ]);

  const projectPath = path.join(__dirname, '../', 'projects', template.template);
  const projectFiles = fs.readdirSync(projectPath);

  projectFiles.forEach(file => {
    const srcPath = path.join(projectPath, file);
    const destPath = path.join(__dirname, '../', file);
    if (fs.statSync(srcPath).isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });

  fs.writeFileSync(path.join(__dirname, '../', 'README.md'), fs.readFileSync(path.join(projectPath, 'README.md')));
};

module.exports = initRepo;