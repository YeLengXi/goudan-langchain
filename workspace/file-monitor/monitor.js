const fs = require('fs');
const path = require('path');

const configPath = process.argv[2];

const readConfig = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(configPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const executeCommand = (command, file) => {
  return new Promise((resolve, reject) => {
    const { spawn } = require('child_process');
    const process = spawn('bash', ['-c', command.replace('{file}', file)]);
    process.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    process.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    process.on('close', (code) => {
      resolve(code);
    });
  });
};

const monitorDirectory = (config) => {
  fs.watch(config.watchDir, (eventType, filename) => {
    if (eventType === 'rename' && filename) {
      const event = eventType;
      const file = filename;
      console.log(`Event: ${event}, File: ${file}`);

      const command = config.events[event];
      if (command) {
        executeCommand(command, file);
      } else {
        console.log(`No command for event: ${event}`);
      }
    }
  });
};

const main = async () => {
  try {
    const config = await readConfig();
    monitorDirectory(config);
  } catch (err) {
    console.error('Error:', err);
  }
};

main();