const fs = require('fs');
const path = require('path');

const configPath = process.argv[2];

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
      } catch (e) {
        reject(e);
      }
    });
  });
}

// 执行命令
function executeCommand(command, file) {
  const filePlaceholder = '{file}';
  const newCommand = command.replace(filePlaceholder, file);
  exec_command({ command: newCommand });
}

// 监控目录
function watchDirectory(config) {
  const watchDir = config.watchDir;
  fs.watch(watchDir, (eventType, filename) => {
    if (eventType === 'rename') {
      if (filename) {
        const filePath = path.join(watchDir, filename);
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error(err);
            return;
          }
          if (stats.isDirectory()) {
            console.log(`Directory created: ${filePath}`);
            executeCommand(config.events.create, filePath);
          } else if (stats.isFile()) {
            console.log(`File ${eventType}: ${filePath}`);
            executeCommand(config.events[eventType], filePath);
          }
        });
      }
    }
  });
}

// 主函数
async function main() {
  try {
    const config = await readConfig(configPath);
    watchDirectory(config);
  } catch (err) {
    console.error('Error:', err);
  }
}

main();