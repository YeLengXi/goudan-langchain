const fs = require('fs');

const parseConfig = (configPath) => {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  return config;
};

const executeCommand = (command, file) => {
  const replacedCommand = command.replace('{file}', file);
  exec(replacedCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行命令出错: ${error}`);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  });
};

const monitorDirectory = (config) => {
  fs.watch(config.watchDir, (eventType, filename) => {
    if (eventType === 'rename') {
      if (filename) {
        const [action, file] = filename.split(/(?<=\.)|(?=\.[^.])/);
        if (action === 'created') {
          executeCommand(config.events.create, file);
        } else if (action === 'deleted') {
          executeCommand(config.events.delete, file);
        }
      }
    } else if (eventType === 'change') {
      executeCommand(config.events.modify, filename);
    }
  }, (err) => {
    if (err) {
      console.error(`监控目录出错: ${err}`);
      return;
    }
    console.log('开始监控目录');
  });
};

const main = () => {
  const args = process.argv.slice(2);
  const configPath = args.find(arg => arg.startsWith('--config='))?.split('=')[1] || 'config.json';
  const config = parseConfig(configPath);
  monitorDirectory(config);
};

main();