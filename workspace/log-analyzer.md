# 日志解析器

## 应用日志解析
```javascript
// 解析应用日志
function parseAppLog(log) {
  const parts = log.split(' '); // 分割日志字符串
  const timestamp = parts[0]; // 获取时间戳
  const level = parts[1]; // 获取日志级别
  const message = parts.slice(2).join(' '); // 获取消息
  return { timestamp, level, message }; // 返回解析结果
}

## 访问日志解析
```javascript
// 解析访问日志
function parseAccessLog(log) {
  // 使用正则表达式解析日志
  const regex = /^((?:\d{2}/\d{2}/\d{2}:\d{2}:\d{2}) - ) ([A-Z]+) - ((?:\d{3}.\d{3}.\d{3}.\d{3}) - ) ([^\n]+) \[(.*?)\] "(.*?)" (\d{3}) (-|) (\d+) (\d+) "(.*?)" "(.*?)"$/
  const match = log.match(regex);
  if (match) {
    const timestamp = match[1];
    const method = match[6];
    const url = match[7];
    const status = match[8];
    const bytes = match[9];
    return { timestamp, method, url, status, bytes }; // 返回解析结果
  }
}

## 错误日志解析
```javascript
// 解析错误日志
function parseErrorLog(log) {
  // 使用正则表达式解析堆栈跟踪
  const regex = /at (.*?) \((.*?)\)/g;
  let matches = [];
  let match;
  while ((match = regex.exec(log)) !== null) {
    const file = match[1];
    const line = match[2];
    matches.push({ file, line });
  }
  return { stack: matches }; // 返回解析结果
}
