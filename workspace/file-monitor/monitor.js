const fs = require('fs');

const configFilePath = process.argv[2];

if (!configFilePath) {
  console.error('Please provide a configuration file path.');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));

const watchDir = config.watchDir;
const events = config.events;

fs.watch(watchDir, (eventType, filename) => {
  if (filename) {
    const command = events[eventType] ? events[eventType].replace('{file}', filename) : null;
    if (command) {
      require('child_process').exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error}`);
          console.error(`Stderr: ${stderr}`);
        }
      });
    }
  }
});
