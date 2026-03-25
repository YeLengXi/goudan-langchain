// file1.js

// 功能点1: 计算两个数的和
function add(a, b) {
  return a + b;
}

// 功能点2: 打印欢迎信息
function welcomeMessage(name) {
  console.log(`Welcome, ${name}!`);
}

// 导出模块
module.exports = {
  add,
  welcomeMessage
};