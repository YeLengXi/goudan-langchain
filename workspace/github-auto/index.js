const { exec_command } = require('./utils');const program = require('commander');require('dotenv').config();const { GitHub } = require('github');const github = new GitHub();

program
  .version('1.0.0')
  .command('create <repo> [options]')
  .description('Create a new GitHub repository')
  .option('--public', 'Create a public repository', false)
  .option('--private', 'Create a private repository', false)
  .option('--description <description>', 'Repository description', '')
  .action(async (repo, options) => {
    try {
      const { public: isPublic, description } = options;
      await createRepository(repo, isPublic, description);
      console.log(`Repository ${repo} created successfully`);
    } catch (error) {
      console.error('Error creating repository:', error);
    }
  });

program
  .command('init [template]')
  .description('Initialize a new project')
  .action(async (template) => {
    try {
      await initializeProject(template);
      console.log('Project initialized successfully');
    } catch (error) {
      console.error('Error initializing project:', error);
    }
  });

program
  .command('push')
  .description('Push the current project to GitHub')
  .action(async () => {
    try {
      await pushToGitHub();
      console.log('Project pushed to GitHub successfully');
    } catch (error) {
      console.error('Error pushing to GitHub:', error);
    }
  });

program.parse(process.argv);