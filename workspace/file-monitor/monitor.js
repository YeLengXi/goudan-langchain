const fs = require('fs');
const path = require('path');

const configFilePath = process.argv[2];

// 读取配置文件
function readConfig(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      try {
        const config = JSON.parse(data);
        resolve(config);
      } catch (error) {
        reject(error);
      }
    });
  });
}

// 执行命令
function executeCommand(command, file) {
  const replacedCommand = command.replace(\{file\}, file);
  console.log(`Executing: ${replacedCommand}`);
  require('child_process').exec(replacedCommand, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing command: ${replacedCommand}`, err);
    } else {
      console.log(`Output: ${stdout}`);
    }
  });
}

// 监控目录
function watchDirectory(directory) {
  fs.watch(directory, (eventType, filename) => {
    console.log(`Event type: ${eventType}, filename: ${filename}`);
    switch (eventType) {
      case 'rename':
        if (filename) {
          const file = path.basename(filename);
          readConfig(configFilePath)
            .then(config => {
              if (config.events.create) {
                executeCommand(config.events.create, file);
              }
              if (config.events.delete) {
                executeCommand(config.events.delete, file);
              }
            })
            .catch(error => {
              console.error('Error reading config:', error);
            });
        }
        break;
      case 'change':
        if (filename) {
          const file = path.basename(filename);
          readConfig(configFilePath)
            .then(config => {
              if (config.events.modify) {
                executeCommand(config.events.modify, file);
              }
            })
            .catch(error => {
              console.error('Error reading config:', error);
            });
        }
        break;
      default:
        console.log('Unknown event type');
    }
  });
}

// 主函数
function main() {
  if (!configFilePath) {
    console.error('No config file path provided');
    return;
  }
  readConfig(configFilePath)
    .then(config => {
      if (!config.watchDir) {
        console.error('No watch directory specified in config');
        return;
      }
      watchDirectory(config.watchDir);
    })
    .catch(error => {
      console.error('Error reading config:', error);
    });
}

// 运行主函数
main();