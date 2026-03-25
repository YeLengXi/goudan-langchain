const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const configPath = process.argv[2];

if (!configPath) {
  console.error('Please provide a configuration file path.
  Usage: node scheduler.js --config <path-to-config-file>
');
  process.exit(1);
}

const configFilePath = path.resolve(configPath);

if (!fs.existsSync(configFilePath)) {
  console.error(`Configuration file not found: ${configFilePath}
`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));

console.log(`Loading tasks from ${configFilePath}...`);

config.tasks.forEach(task => {
  cron.schedule(task.cron, () => {
    console.log(`Executing task: ${task.name} at ${new Date().toLocaleString()}`);
    execCommand(task.command);
  });
});

function execCommand(command) {
  require('child_process').exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error: ${error}
${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}