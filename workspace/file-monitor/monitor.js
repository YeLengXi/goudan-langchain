const fs = require('fs');

const parseConfig = (configPath) => {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  return config;
};

const executeCommand = (command, file) => {
  const commandWithFile = command.replace('{file}', file);
  exec(commandWithFile);
};

const monitorDirectory = (watchDir, events) => {
  fs.watch(watchDir, (eventType, filename) => {
    if (eventType === 'rename' && filename) {
      const file = watchDir + '/' + filename;
      switch (eventType) {
        case 'create':
          executeCommand(events.create, file);
          break;
        case 'change':
          executeCommand(events.modify, file);
          break;
        case 'unlink':
          executeCommand(events.delete, file);
          break;
      }
    }
  });
};

const main = () => {
  const args = process.argv.slice(2);
  const configPath = args[0] || 'config.json';
  const config = parseConfig(configPath);
  monitorDirectory(config.watchDir, config.events);
};

main();