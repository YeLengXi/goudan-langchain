const fs = require('fs');
const path = require('path');
const { apiUrl, gitUrl, personalAccessToken } = require('./config');
const axios = require('axios');

const createRepository = async (name, isPublic, description) => {
  const response = await axios.post(`${apiUrl}/user/repos`, {
    name,
    private: !isPublic
  }, {
    headers: {
      Authorization: `token ${personalAccessToken}`
    }
  });

  return response.data.clone_url;
};

const initializeLocalRepository = async (url) => {
  const repoName = url.split('/').pop();
  const repoPath = path.join(__dirname, repoName);
  fs.mkdirSync(repoPath, { recursive: true });

  fs.writeFileSync(path.join(repoPath, 'README.md'), '# Welcome to {{repoName}}');
  fs.writeFileSync(path.join(repoPath, '.gitignore'), 'node_modules/
');
  fs.writeFileSync(path.join(repoPath, 'LICENSE'), 'MIT License

Copyright (c) 2023 {{repoName}}

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the \"Software\"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITIES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
');

  return repoPath;
};

const pushToGitHub = async (repoPath) => {
  const { exec } = require('child_process');

  exec(`git init ${repoPath}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }

    exec(`git add . ${repoPath}`, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }

      exec(`git commit -m 'Initial commit' ${repoPath}`, (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }

        exec(`git remote add origin ${gitUrl}/${repoName}`, (err, stdout, stderr) => {
          if (err) {
            console.error(err);
            return;
          }

          exec(`git push -u origin main`, (err, stdout, stderr) => {
            if (err) {
              console.error(err);
              return;
            }

            console.log('Repository pushed to GitHub successfully.');
          });
        });
      });
    });
  });
};

module.exports = {
  createRepository,
  initializeLocalRepository,
  pushToGitHub
};