#!/usr/bin/env node

const fetch = require('node-fetch');

const minimist = require('minimist');

const { read_file, write_file, exec_command, list_directory } = require('./utils');

const configFilePath = './config.json';

// 读取配置文件
async function readConfig() {
  try {
    const configContent = await read_file(configFilePath);
    return JSON.parse(configContent);
  } catch (error) {
    return {};
  }
}

// 保存配置文件
async function saveConfig(config) {
  await write_file(configFilePath, JSON.stringify(config, null, 2));
}

// 发送 HTTP 请求
async function sendRequest(method, url, headers = {}, body = null) {
  try {
    const response = await fetch(url, {
      method,
      headers,
      body: method === 'POST' || method === 'PUT' || method === 'PATCH' ? JSON.stringify(body) 
      : null
    });
    return response;
  } catch (error) {
    throw error;
  }
}

// 格式化响应
function formatResponse(response) {
  const { status, headers } = response;
  const headerString = Object.entries(headers).map(([key, value]) => `${key}: ${value}`).join('
');
  const responseString = `Status: ${status}
Headers:
${headerString}
Body: ${JSON.stringify(response.body, null, 2)}`;
  return responseString;
}

// 主程序
async function main() {
  const args = minimist(process.argv.slice(2));
  const config = await readConfig();

  let { method, url } = args;
  let headers = args.headers || {};
  let body = args.body || null;

  if (args['request-file']) {
    const requestContent = await read_file(args['request-file']);
    const request = JSON.parse(requestContent);
    method = request.method;
    url = request.url;
    headers = request.headers || {};
    body = request.body || null;
  }

  const response = await sendRequest(method, url, headers, body);
  console.log(formatResponse(response));
}

main().catch(error => {
  console.error('Error:', error);
});