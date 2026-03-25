const fs = require('fs');
const path = require('path');

const parseConfig = (configPath) => {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  return config;
};

const executeCommand = (command, file) => {
  console.log(`Executing command for ${file}: ${command}`);
  require('child_process').exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing command for ${file}: ${err}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
};

const monitorDirectory = (watchDir, events) => {
  fs.watch(watchDir, (eventType, filename) => {
    if (eventType === 'rename' && filename) {
      const event = filename.includes('create') ? 'create' : filename.includes('delete') ? 'delete' : 'modify';
      executeCommand(events[event], filename);
    }
  });
};

const main = () => {
  const configPath = path.resolve(__dirname, process.argv[2] || 'config.json');
  try {
    const config = parseConfig(configPath);
    monitorDirectory(config.watchDir, config.events);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

module.exports = main;

if (require.main === module) {
  main();
}