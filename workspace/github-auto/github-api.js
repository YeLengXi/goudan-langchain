const axios = require('axios'); 

const GITHUB_API_URL = 'https://api.github.com'; 

const githubToken = process.env.GITHUB_TOKEN; 

const headers = { 
  'Authorization': `token ${githubToken}`, 
  'Accept': 'application/vnd.github.v3+json' 
}; 

async function createRepo(repoName, isPrivate) { 
  const response = await axios.post(`${GITHUB_API_URL}/user/repos`, { 
    name: repoName, 
    private: isPrivate 
  }, { 
    headers 
  }); 

  return response.data; 
}

module.exports = { createRepo };