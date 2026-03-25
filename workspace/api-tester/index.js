const https = require('https');
const fs = require('fs');
const path = require('path');

const parseArgs = require('minimist');
const axios = require('axios');

const BASE_PATH = path.join(__dirname, '../');
const CONFIG_PATH = path.join(BASE_PATH, 'config.json');

// 读取配置文件
const readConfig = async () => {
  try {
    const data = await fs.promises.readFile(CONFIG_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

// 写入配置文件
const writeConfig = async (config) => {
  try {
    await fs.promises.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing config file:', error);
  }
};

// 处理请求
const handleRequest = async (method, url, data, headers) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// 主程序
const main = async () => {
  const args = parseArgs(process.argv.slice(2));

  // 解析命令
  let { method, url, data, headers } = args;
  if (args.d) {
    data = JSON.parse(args.d);
  }
  if (args.h) {
    headers = JSON.parse(args.h);
  }

  // 读取配置
  const config = await readConfig();

  // 发送请求
  try {
    const response = await handleRequest(method, url, data, headers);
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// 运行主程序
main();