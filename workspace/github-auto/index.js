const axios = require('axios');
const fs = require('fs');
const path = require('path');

const githubApiUrl = 'https://api.github.com';
const personalAccessToken = 'YOUR_PERSONAL_ACCESS_TOKEN';

const headers = {
  'Authorization': `token ${personalAccessToken}`
};

async function createRepository(repoName, isPublic, description) {
  const response = await axios.post(
    `${githubApiUrl}/user/repos`,
    {
      name: repoName,
      private: !isPublic,
      description,
      auto_init: true
    },
    { headers }
  );

  return response.data;
}

async function initializeLocalRepo(repoName) {
  const repoPath = path.join(__dirname, '..', repoName);
  fs.mkdirSync(repoPath, { recursive: true });
  fs.writeFileSync(path.join(repoPath, 'README.md'), '');
  fs.writeFileSync(path.join(repoPath, '.gitignore'), '# .gitignore
');
  fs.writeFileSync(path.join(repoPath, 'LICENSE'), 'MIT License

Copyright (c) 2023 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.');

  return repoPath;
}

module.exports = {
  createRepository,
  initializeLocalRepo
}