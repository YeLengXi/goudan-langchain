const fs = require('fs');const path = require('path');const https = require('https');const { promisify } = require('util');const exec = promisify(exec);const read_file = require('./read_file');const write_file = require('./write_file');const list_directory = require('./list_directory');const exec_command = require('./exec_command');class GitHubAPI {
  constructor(token) {
    this.token = token;
  }

  createRepository(name, isPublic) {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${isPublic ? '' : 'private'}/${name}`,
      method: 'POST',
      headers: {
        'Authorization': `token ${this.token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
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

      req.on('error', (error) => {
        reject(error);
      });

      req.write(JSON.stringify({ name, private: !isPublic }));
      req.end();
    });
  }
}

module.exports = GitHubAPI;