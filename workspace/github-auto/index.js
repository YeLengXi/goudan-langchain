const yargs = require('yargs/yargs');const { create, init, push } = require('./cli');const { GitHubAPI } = require('./github-api');const { TemplateSystem } = require('./template-system');const { CLI } = require('./cli');

const argv = yargs.argv;

switch (argv._[0]) {
  case 'create':
    create(argv);
    break;
  case 'init':
    init(argv);
    break;
  case 'push':
    push();
    break;
  default:
    console.log('Unknown command');
}