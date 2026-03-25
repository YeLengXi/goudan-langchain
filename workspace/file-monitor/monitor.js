const fs = require('fs');
const path = require('path');

const configPath = process.argv[2];

// 读取配置文件
function readConfig(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading config file: ${error.message}`);
    process.exit(1);
  }
}

// 执行命令
function executeCommand(command, file) {
  const replacedCommand = command.replace(\{file\}, file);
  console.log(`Executing: ${replacedCommand}`);
  try {
    require('child_process').exec(replacedCommand);
  } catch (error) {
    console.error(`Error executing command: ${error.message}`);
  }
}

// 监控目录
function watchDirectory(dirPath, events) {
  fs.watch(dirPath, (eventType, filename) => {
    if (events[eventType] && filename) {
      executeCommand(events[eventType], path.join(dirPath, filename));
    }
  });
}

// 主函数
function main() {
  const config = readConfig(configPath);
  watchDirectory(config.watchDir, config.events);
}

// 运行主函数
main();