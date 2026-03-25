const fs = require('fs');
const https = require('https');
const { exec } = require('child_process');

const githubToken = 'YOUR_GITHUB_TOKEN';
const baseUrl = 'https://api.github.com';
const templatesDir = 'templates';

const createRepo = async (name, isPublic, description) => {
  const options = {
    hostname: 'api.github.com',
    path: `/user/repos`,
    method: 'POST',
    headers: {
      'Authorization': `token ${githubToken}`,
      'Accept': 'application/vnd.github.v3+json'
    },
    body: JSON.stringify({
      name: name,
      private: !isPublic,
      description: description
    })
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(options.body);
    req.end();
  });
};

const initRepo = async () => {
  exec('git init', (err, stdout, stderr) => {
    if (err) {
      console.error('Error initializing git:', stderr);
      return;
    }
    console.log('Git initialized successfully.');
  });

  exec('npm init -y', (err, stdout, stderr) => {
    if (err) {
      console.error('Error initializing npm:', stderr);
      return;
    }
    console.log('Npm initialized successfully.');
  });

  fs.copyFileSync('templates/README.md', 'README.md');
  fs.copyFileSync('templates/.gitignore', '.gitignore');
  fs.copyFileSync('templates/LICENSE', 'LICENSE');
};

module.exports = {
  createRepo,
  initRepo
}