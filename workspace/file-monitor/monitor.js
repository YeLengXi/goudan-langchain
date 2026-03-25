const fs = require('fs');

const configPath = process.argv[2];

if (!configPath) {
  console.error('No config file provided.');
  process.exit(1);
}

const config = require(configPath);

const watchDir = config.watchDir;
const events = config.events;

fs.watch(watchDir, (eventType, filename) => {
  if (eventType === 'rename') {
    const action = events[filename.includes('create') ? 'create' : filename.includes('delete') ? 'delete' : 'modify'];
    if (action) {
      exec_command(action.replace('{file}', filename));
    }
  }
});

process.on('SIGINT', () => {
  console.log('Exiting...');
  process.exit(0);
});