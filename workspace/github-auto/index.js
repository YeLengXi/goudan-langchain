const { Command } = require('commander');

const axios = require('axios');

const createRepository = async (name, isPublic, description) => {
  const token = 'YOUR_GITHUB_TOKEN';
  const url = 'https://api.github.com/user/repos';
  const { data } = await axios.post(url, {
    name,
    private: !isPublic,
    description
  }, {
    headers: {
      Authorization: `token ${token}`
    }
  });
  return data; 
};

const initRepository = async (template) => {
  // Initialize git
  exec_command('git init');
  // Create project structure
  exec_command(`mkdir src && touch src/index.js`);
  // Add initial files
  const files = {
    'README.md': read_file(`templates/README.md`).then(content => {
      write_file({ content, file_path: 'README.md' });
    }),
    '.gitignore': read_file('templates/.gitignore').then(content => {
      write_file({ content, file_path: '.gitignore' });
    }),
    'LICENSE': read_file('templates/LICENSE').then(content => {
      write_file({ content, file_path: 'LICENSE' });
    })
  };
  // Wait for all files to be written
  await Promise.all(files);
};

const pushRepository = async () => {
  // Add remote
  exec_command('git remote add origin https://github.com/your-username/your-repository.git');
  // Commit changes
  exec_command('git add .');
  exec_command('git commit -m "Initial commit"');
  // Push to main branch
  exec_command('git push -u origin main');
};

const program = new Command();

program.command('create <name> --[public|private] [description]').action((name, isPublic, description) => {
  createRepository(name, isPublic, description).then(data => {
    console.log(`Repository created: ${data.clone_url}`);
  }).catch(error => {
    console.error('Error creating repository:', error);
  });
});

program.command('init --template <template>').action((template) => {
  initRepository(template).then(() => {
    console.log('Repository initialized.');
  }).catch(error => {
    console.error('Error initializing repository:', error);
  });
});

program.command('push').action(() => {
  pushRepository().then(() => {
    console.log('Repository pushed.');
  }).catch(error => {
    console.error('Error pushing repository:', error);
  });
});

program.parse(process.argv);
