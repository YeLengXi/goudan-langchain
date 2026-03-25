const fs = require('fs');

const configPath = process.argv[2];

// 读取配置文件
read_file(configPath).then(config => {
  const watchDir = config.watchDir;
  const events = config.events;

  // 监控目录
  fs.watch(watchDir, (eventType, filename) => {
    if (filename) {
      console.log(`Event type: ${eventType}, File: ${filename}`);

      // 根据事件类型执行命令
      if (eventType === 'rename') {
        if (fs.statSync(watchDir + '/' + filename).isFile()) {
          const eventCommand = events[eventType];
          eventCommand = eventCommand.replace('{file}', filename);
          exec_command(eventCommand);
        }
      }
    }
  }).on('error', err => {
    console.error(`Error watching directory: ${err.message}`);
  });
}).catch(err => {
  console.error(`Error reading config file: ${err.message}`);
});
