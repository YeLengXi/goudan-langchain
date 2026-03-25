const { exec_command } = require('./utils.js'); 

const { createRepo } = require('./github-api.js'); 

async function init(args, template) { 
  const templatePath = `./templates/${template}.js`; 
  const templateContent = read_file(templatePath); 

  const repoName = args; 
  const repo = await createRepo(repoName, false); 
  const repoUrl = repo.html_url; 

  exec_command(`mkdir -p ${repoName} && cd ${repoName} && git init && git add . && git commit -m 'Initial commit' && git remote add origin ${repoUrl} && git push -u origin main`); 

  write_file(`${repoName}/index.js`, templateContent); 

  console.log(`Repository initialized: ${repoUrl}`); 
}