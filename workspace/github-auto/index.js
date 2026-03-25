#!/usr/bin/env node

const program = require('commander');
const axios = require('axios');
const fs = require('fs');
const { exec } = require('child_process');

const apiUrl = 'https://api.github.com';
const accessToken = 'YOUR_GITHUB_ACCESS_TOKEN';

program
  .command('create <name> [public]')
  .description('创建 GitHub 仓库')
  .option('--private', '创建私有仓库')
  .action((name, public) => {
    const isPrivate = public || program.private;
    createRepo(name, isPrivate);
  })

program
  .command('init [template]')
  .description('初始化项目')
  .action((template) => {
    initProject(template);
  })

program
  .command('push')
  .description('推送到 GitHub')
  .action(() => {
    pushToGitHub();
  })

program.parse(process.argv);
