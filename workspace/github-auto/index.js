const fs = require('fs');
const https = require('https');
const path = require('path');
const { exec } = require('child_process');

const githubToken = 'YOUR_GITHUB_TOKEN';
const apiUrl = 'https://api.github.com';

const createRepo = async (name, isPublic, description) => {
  const options = {
    hostname: 'api.github.com',
    path: `/user/repos`,
    method: 'POST',
    headers: {
      'Authorization': `token ${githubToken}`,
      'Accept': 'application/vnd.github.v3+json'
    },
    json: true,
    body: {
      name: name,
      private: !isPublic
    }
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      if (res.statusCode === 201) {
        resolve(res.body);
      } else {
        reject(new Error('Failed to create repository'));
      }
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(JSON.stringify(options.body));
    req.end();
  });
};

const initRepo = async (repoPath) => {
  exec(`git init ${repoPath}`, (err, stdout, stderr) => {
    if (err) {
      throw err;
    }
    console.log(stdout);
  });
};

const addFiles = async (repoPath, template) => {
  const files = {
    'README.md': template.readme,
    '.gitignore': template.gitignore,
    'LICENSE': template.license
  }

  for (const [file, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(repoPath, file), content);
  }
};

const commitAndPush = async (repoPath) => {
  exec(`git add .`, (err, stdout, stderr) => {
    if (err) {
      throw err;
    }
    console.log(stdout);
  });
  exec(`git commit -m 'Initial commit'`, (err, stdout, stderr) => {
    if (err) {
      throw err;
    }
    console.log(stdout);
  });
  exec(`git remote add origin git@github.com:YOUR_USERNAME/${repoPath}.git`, (err, stdout, stderr) => {
    if (err) {
      throw err;
    }
    console.log(stdout);
  });
  exec(`git push -u origin main`, (err, stdout, stderr) => {
    if (err) {
      throw err;
    }
    console.log(stdout);
  });
};

module.exports = {
  createRepo,
  initRepo,
  addFiles,
  commitAndPush
}