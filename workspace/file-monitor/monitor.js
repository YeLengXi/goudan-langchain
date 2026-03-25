const fs = require('fs');

const configFilePath = process.argv[2];

const readConfig = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(configFilePath, 'utf8', (err, data) => {
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
    const exec = require('child_process').exec;
    exec(command.replace(\{file\}, file), (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        console.log(stdout);
        resolve(stdout);
      }
    });
  });
};

const monitorDirectory = async () => {
  try {
    const config = await readConfig();
    const watchDir = config.watchDir;
    const events = config.events;

    fs.watch(watchDir, (eventType, filename) => {
      if (eventType === 'rename' && events.create) {
        executeCommand(events.create, filename);
      }
      if (eventType === 'change' && events.modify) {
        executeCommand(events.modify, filename);
      }
      if (eventType === 'unlink' && events.delete) {
        executeCommand(events.delete, filename);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

monitorDirectory();