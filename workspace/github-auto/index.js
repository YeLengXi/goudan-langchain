const axios = require('axios');

const apiUrl = 'https://api.github.com';
const gitUrl = 'https://github.com';

const createRepository = async (name, isPublic, description) => {
  const token = 'YOUR_GITHUB_TOKEN';
  const response = await axios.post(`${apiUrl}/user/repos`, {
    name,
    private: !isPublic
  }, {
    headers: {
      Authorization: `token ${token}`
    }
  });

  return response.data.clone_url;
};

const initializeRepository = async (url) => {
  const { stdout, stderr } = await exec_command(`git init ${url}`);
  if (stderr) {
    throw new Error(stderr);
  }

  const { stdout: readmeContent } = await read_file('E:/goudan-langchain/workspace/github-auto/templates/README.md');
  await write_file(`${url}/README.md`, readmeContent);

  const { stdout: gitignoreContent } = await read_file('E:/goudan-langchain/workspace/github-auto/templates/gitignore');
  await write_file(`${url}/.gitignore`, gitignoreContent);

  const { stdout: licenseContent } = await read_file('E:/goudan-langchain/workspace/github-auto/templates/LICENSE');
  await write_file(`${url}/LICENSE`, licenseContent);

  await exec_command(`git add .
  git commit -m 'Initial commit'
  git remote add origin ${url}
  git push -u origin main`);
};

module.exports = {
  createRepository,
  initializeRepository
};