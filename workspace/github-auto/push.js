const { exec_command } = require('./utils.js'); 

const { createRepo } = require('./github-api.js'); 

async function push() { 
  const repoName = process.env.REPO_NAME; 
  const repoUrl = process.env.REPO_URL; 

  exec_command(`cd ${repoName} && git add . && git push -u origin main`); 

  console.log(`Repository pushed: ${repoUrl}`); 
}