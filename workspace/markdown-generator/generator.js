const fs = require('fs');
const path = require('path');

// 解析JSDoc注释并生成Markdown文档
function generateMarkdown(inputFilePath, outputFilePath, templateFilePath) {
  // 读取输入文件内容
  const inputContent = fs.readFileSync(inputFilePath, 'utf8');
  // 解析JSDoc注释
  const jsdocComments = extractJSDocComments(inputContent);
  // 读取模板文件内容
  const templateContent = fs.readFileSync(templateFilePath, 'utf8');
  // 替换模板中的占位符
  const markdownContent = templateContent.replace(/{{(.*?)}}/g, (match, key) => {
    if (jsdocComments[key]) {
      return jsdocComments[key];
    }
    return '';
  });
  // 写入输出文件
  fs.writeFileSync(outputFilePath, markdownContent);
}

// 提取JSDoc注释
function extractJSDocComments(content) {
  const commentsRegex = //\*\*(.*?)\*\*/gs;
  let match;
  const comments = {};
  while ((match = commentsRegex.exec(content)) !== null) {
    const comment = match[1];
    const tagRegex = /@\w+\s+(.*)/gs;
    let tagMatch;
    while ((tagMatch = tagRegex.exec(comment)) !== null) {
      const tagName = tagMatch[1];
      const tagValue = tagMatch[2].trim();
      comments[tagName] = tagValue;
    }
  }
  return comments;
}

module.exports = {
  generateMarkdown,
  extractJSDocComments
};