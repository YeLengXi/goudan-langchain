const { exec_command } = require('./utils.js'); 

const { createRepo } = require('./github-api.js'); 

async function create(args, description, isPrivate) { 
  const repoName = args; 
  const repo = await createRepo(repoName, isPrivate); 
  const repoUrl = repo.html_url; 

  exec_command(`mkdir -p ${repoName} && cd ${repoName} && git init && git add . && git commit -m 'Initial commit' && git remote add origin ${repoUrl} && git push -u origin main`); 

  if (description) { 
    write_file(`${repoName}/README.md`, description); 
  } 

  write_file(`${repoName}/.gitignore`, 'node_modules/
Dockerfile'); 
  write_file(`${repoName}/LICENSE`, 'MIT'); 

  console.log(`Repository created: ${repoUrl}`); 
}