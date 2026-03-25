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
    const cmd = command.replace(/{file}/g, file);
    require('child_process').exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });
};

const monitorDirectory = (config) => {
  const watchDir = config.watchDir;
  const events = config.events;
  fs.watch(watchDir, (eventType, filename) => {
    if (eventType === 'rename') {
      if (filename) {
        const file = path.basename(filename);
        if (events.create) {
          executeCommand(events.create, file).catch((err) => {
            console.error(err);
          });
        }
        if (events.delete) {
          executeCommand(events.delete, file).catch((err) => {
            console.error(err);
          });
        }
      }
    } else if (eventType === 'change') {
      if (events.modify) {
        executeCommand(events.modify, filename).catch((err) => {
          console.error(err);
        });
      }
    }
  });
};

const main = async () => {
  try {
    const config = await readConfig();
    monitorDirectory(config);
  } catch (err) {
    console.error('Error reading config:', err);
  }
};

main();