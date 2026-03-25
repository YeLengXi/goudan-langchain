const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const configPath = process.argv[2] || 'config.json';

// 读取配置文件
const readConfig = async () => {
  try {
    const config = await read_file(configPath);
    return JSON.parse(config);
  } catch (error) {
    console.error('Error reading config file:', error);
    process.exit(1);
  }
};

// 执行命令
const executeCommand = (command, file) => {
  const cmd = command.replace(/{file}/g, file);
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${cmd}`, error);
      return;
    }
    console.log(stdout);
  });
};

// 监控目录
const monitorDirectory = async (config) => {
  const watchDir = config.watchDir;
  const events = config.events;
  try {
    fs.watch(watchDir, (event, filename) => {
      if (events[event]) {
        executeCommand(events[event], filename);
      }
    });
  } catch (error) {
    console.error('Error watching directory:', error);
    process.exit(1);
  }
};

// 主程序
const main = async () => {
  const config = await readConfig();
  monitorDirectory(config);
};

main();