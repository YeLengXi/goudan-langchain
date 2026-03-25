const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const parseConfig = (configPath) => {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  return config;
};

const executeCommand = (command, file) => {
  const replacedCommand = command.replace(\{file\}, file);
  console.log(`Executing: ${replacedCommand}`);
  exec(replacedCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      console.error(`Stderr: ${stderr}`);
    }
  });
};

const monitorDirectory = (directoryPath) => {
  fs.watch(directoryPath, (eventType, filename) => {
    if (eventType === 'rename' && filename) {
      const config = parseConfig(path.join(directoryPath, 'config.json'));
      const command = config.events[eventType];
      if (command) {
        executeCommand(command, filename);
      }
    }
  });
};

const main = () => {
  const args = process.argv.slice(2);
  const configPath = args.find(arg => arg.startsWith('--config '))?.split('--config ')[1] || 'config.json';
  const config = parseConfig(configPath);
  monitorDirectory(config.watchDir);
};

main();