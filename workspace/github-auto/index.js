const axios = require('axios');

const apiUrl = 'https://api.github.com';
const gitHubToken = 'YOUR_GITHUB_TOKEN';

module.exports = {
  createRepository: async (name, isPublic, description) => {
    const response = await axios.post(`${apiUrl}/user/repos`, {
      name,
      private: !isPublic
    }, {
      headers: {
        Authorization: `token ${gitHubToken}`
      }
    });
    return response.data;
  },

  initializeGit: async (path) => {
    await exec_command(`cd ${path} && git init`);
    await exec_command(`cd ${path} && echo '# .gitignore' > .gitignore`);
    await exec_command(`cd ${path} && echo 'LICENSE' > LICENSE`);
  },

  addFiles: async (path) => {
    await exec_command(`cd ${path} && echo 'README.md' > README.md`);
    await exec_command(`cd ${path} && echo '# Project description' >> README.md`);
    await exec_command(`cd ${path} && echo '## Features' >> README.md`);
    await exec_command(`cd ${path} && echo '' >> README.md`);
  },

  commitAndPush: async (path, repoUrl) => {
    await exec_command(`cd ${path} && git add .`);
    await exec_command(`cd ${path} && git commit -m 'Initial commit'`);
    await exec_command(`cd ${path} && git remote add origin ${repoUrl}`);
    await exec_command(`cd ${path} && git push -u origin main`);
  }
};