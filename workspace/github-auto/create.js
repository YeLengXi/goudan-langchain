const { program } = require('commander');
const { createRepository } = require('../index');
const dotenv = require('dotenv');
dotenv.config();

program
  .command('create <repoName>')
  .option('--public', 'Create a public repository', false)
  .option('--private', 'Create a private repository', false)
  .option('--description <description>', 'Repository description', '')
  .action(async (repoName, options) => {
    try {
      const repository = await createRepository(repoName, !options.private, options.description);
      console.log(`Repository created: ${repository.html_url}`);
    } catch (error) {
      console.error('Error:', error);
    }
  });

program.parse(process.argv);