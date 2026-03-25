const { program } = require('commander');

const createGitHubRepository = require('./github-api').createGitHubRepository;

program
  .command('create <repoName>')
  .option('--public', 'Create a public repository')
  .option('--private', 'Create a private repository')
  .action(async (repoName, options) => {
    const isPublic = options.public || !options.private;
    try {
      const response = await createGitHubRepository(process.env.GITHUB_TOKEN, repoName, isPublic);
      console.log(`Repository created: ${response.full_name}`);
    } catch (error) {
      console.error('Error creating repository:', error);
    }
  });

program
  .command('init')
  .option('--template <template>', 'Initialize project with a specific template')
  .action(async (options) => {
    if (!options.template) {
      console.error('Error: Missing template name. Use --template <template>.
');      return;
    }

    // Create project structure and initialize git
    console.log(`Initializing project with ${options.template} template...`);
    // ... (additional code for project initialization and template application)
  });

program
  .command('push')
  .action(async () => {
    // Add remote and push to GitHub
    console.log('Pushing to GitHub...');
    // ... (additional code for pushing to GitHub)
  });

program.parse(process.argv);