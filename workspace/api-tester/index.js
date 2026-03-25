#!/usr/bin/env node
const { program } = require('commander');

program
  .command('GET <url>')
  .action((url) => {
    // TODO: Implement GET request
  })
  .command('POST <url> -d <data>')
  .action((url, data) => {
    // TODO: Implement POST request
  })
  .command('PUT <url> -d <data>')
  .action((url, data) => {
    // TODO: Implement PUT request
  })
  .command('DELETE <url>')
  .action((url) => {
    // TODO: Implement DELETE request
  })
  .command('PATCH <url> -d <data>')
  .action((url, data) => {
    // TODO: Implement PATCH request
  })
  .command('--request-file <file>')
  .action((file) => {
    // TODO: Implement request file handling
  })

program.parse(process.argv);