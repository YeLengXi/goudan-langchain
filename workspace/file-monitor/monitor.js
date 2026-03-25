const fs = require('fs');

const parseConfig = (configPath) => {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  return config;
};

const executeCommand = (command, file) => {
  console.log(`Executing command for ${file}: ${command}`);
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing command for ${file}: ${err}`);
    }
    console.log(`Stdout: ${stdout}
Stderr: ${stderr}`);
  });
};

const monitorDirectory = (directoryPath, config) => {
  fs.watch(directoryPath, (eventType, filename) => {
    if (eventType === 'rename' && filename) {
      const event = filename.split(':')[0];
      const file = filename.split(':')[1];
      if (config.events[event]) {
        executeCommand(config.events[event], file);
      }
    }
  });
};

const main = () => {
  const args = process.argv.slice(2);
  const configPath = args.find(arg => arg.startsWith('--config='))?.split('=')[1] || 'config.json';
  const config = parseConfig(configPath);
  monitorDirectory(config.watchDir, config);
};

main();