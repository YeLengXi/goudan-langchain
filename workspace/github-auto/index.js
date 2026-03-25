// This is the main program of the GitHub automation tool.
//
// Dependencies:
// - axios

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const githubApiUrl = 'https://api.github.com';
const personalAccessToken = 'YOUR_GITHUB_ACCESS_TOKEN';

const createRepository = async (name, isPublic, description) => {
  const response = await axios.post(`${githubApiUrl}/user/repos`, {
    name,
    private: !isPublic
  }, {
    headers: {
      'Authorization': `token ${personalAccessToken}
    }
  });

  return response.data;
};

const initializeLocalRepository = async (repoUrl) => {
  const repoName = path.basename(repoUrl, '.git');
  const repoPath = path.join(__dirname, repoName);
  fs.mkdirSync(repoPath, { recursive: true });

  fs.writeFileSync(path.join(repoPath, 'README.md'), '# Welcome to {{repo_name}}');
  fs.writeFileSync(path.join(repoPath, '.gitignore'), 'node_modules/
');
  fs.writeFileSync(path.join(repoPath, 'LICENSE'), 'MIT License

Copyright (c) 2023 {{repo_name}}

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

const addRemoteAndPush = async (repoPath, repoUrl) => {
  const repoName = path.basename(repoUrl, '.git');
  const originUrl = `https://${personalAccessToken}@github.com/${personalAccessToken}/${repoName}.git`; 

  exec_command(`git init ${repoPath}`);
  exec_command(`git remote add origin ${originUrl}`);
  exec_command(`git add .
  git commit -m 'Initial commit'
  git push -u origin main`);
};

module.exports = {
  createRepository,
  initializeLocalRepository,
  addRemoteAndPush
};