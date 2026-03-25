// Parse command line arguments
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

module.exports = (args) => {
  const options = yargs(hideBin(args)).argv;

  const method = options._[0];
  const url = options.url;
  const data = options.d || options.data;
  const headers = options.h || options.headers;

  return {
    method,
    url,
    data,
    headers
  };