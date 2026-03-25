const { program } = require('commander');

const ejs = require('ejs');

const axios = require('axios');

const fs = require('fs');

const templateDir = './templates';

const githubToken = 'YOUR_GITHUB_TOKEN';

const githubApiUrl = 'https://api.github.com';

program
  .command('create <repoName> [isPrivate]')
  .description('创建一个新的 GitHub 仓库')
  .option('--public', '创建公开仓库')
  .option('--private', '创建私有仓库')
  .action((repoName, isPrivate) => {
    const privacy = isPrivate ? 'private' : 'public';
    const repoUrl = `${githubApiUrl}/user/repos`; 
    const data = {
      name: repoName,
      private: privacy === 'private'
    };
    axios.post(repoUrl, data, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    }).then(response => {
      console.log(`仓库 ${repoName} 已创建。`);
      const readmeTemplate = fs.readFileSync(`${templateDir}/README.md`, 'utf8');
      const readmeContent = ejs.render(readmeTemplate, { repoName });
      fs.writeFileSync('README.md', readmeContent);
      fs.writeFileSync('.gitignore', 'node_modules/
Dockerfile
Dockerfileignore
');
      fs.writeFileSync('LICENSE', 'MIT License

Copyright (c) 2023 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
');
      exec_command('git init');
      exec_command('git add .');
      exec_command('git commit -m "Initial commit"');
      exec_command(`git remote add origin git@github.com:your_username/${repoName}.git`);
      exec_command(`git push -u origin main`);
    }).catch(error => {
      console.error('创建仓库失败:', error);
    });
  })
  .command('init [template]')
  .description('初始化 GitHub 仓库')
  .action((template) => {
    if (!template) {
      template = 'nodejs';
    }
    const templateDir = './templates';
    const templatePath = `${templateDir}/${template}.ejs`;
    if (!fs.existsSync(templatePath)) {
      console.error('模板不存在');
      return;
    }
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    const templateData = {
      repoName: 'your-repo-name',
      description: 'Your project description here',
      keywords: 'nodejs,github,template'
    };
    const renderedContent = ejs.render(templateContent, templateData);
    fs.writeFileSync('package.json', renderedContent);
    fs.writeFileSync('README.md', renderedContent);
    fs.writeFileSync('.gitignore', 'node_modules/
Dockerfile
Dockerfileignore
');
    fs.writeFileSync('LICENSE', 'MIT License

Copyright (c) 2023 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
');
    exec_command('git init');
    exec_command('git add .');
    exec_command('git commit -m "Initial commit"');
  })
  .command('push')
  .description('将本地仓库推送到 GitHub')
  .action(() => {
    exec_command('git push');
  });

program.parse(process.argv);