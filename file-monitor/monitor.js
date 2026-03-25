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
    const cmd = command.replace('{file}', file);
    require('child_process').exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        console.log(stdout);
        resolve(stdout);
      }
    });
  });
};

const monitorDirectory = (config) => {
  fs.watch(config.watchDir, (eventType, filename) => {
    if (eventType === 'rename' && filename) {
      const filePath = path.join(config.watchDir, filename);
      readConfig().then(config => {
        executeCommand(config.events[ eventType ], filePath).then(() => {
          console.log(`Processed ${eventType} event for ${filePath}`);
        }).catch(err => {
          console.error(`Error processing ${eventType} event for ${filePath}: ${err}`);
        });
      }).catch(err => {
        console.error(`Error reading config: ${err}`);
      });
    }
  });
};

const main = () => {
  readConfig().then(config => {
    monitorDirectory(config);
  }).catch(err => {
    console.error(`Error: ${err}`);
  });
}

main();