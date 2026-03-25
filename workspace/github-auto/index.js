const fs = require('fs');
const https = require('https');
const { exec } = require('child_process');

const apiUrl = 'https://api.github.com';
const token = 'YOUR_GITHUB_TOKEN';

const headers = {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json'
};

function createRepo(name, isPublic, description) {
    const options = {
        hostname: 'api.github.com',
        path: `/user/repos`,
        method: 'POST',
        headers: headers
    }

    const data = {
        name: name,
        private: !isPublic
    }

    if (description) {
        data.description = description;
    }

    const req = https.request(options, (res) => {
        if (res.statusCode === 201) {
            console.log('Repository created successfully');
            initGit();
        } else {
            console.error('Failed to create repository');
        }
    });

    req.on('error', (e) => {
        console.error(`Request Error: ${e.message}`);
    });

    req.write(JSON.stringify(data));
    req.end();
}

function initGit() {
    exec('git init', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error initializing git: ${error.message}`);
            return;
        }
        console.log('Git initialized successfully');
        createProjectStructure();
    });
}

function createProjectStructure() {
    const projectStructure = {
        'README.md': '# Project Name
',
        '.gitignore': 'node_modules/
',
        'LICENSE': 'MIT
'
    }

    Object.keys(projectStructure).forEach((file) => {
        fs.writeFileSync(file, projectStructure[file]);
    });
    console.log('Project structure created successfully');
}

module.exports = {
    createRepo: createRepo,
    initGit: initGit
}