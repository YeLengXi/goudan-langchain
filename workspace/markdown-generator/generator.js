const fs = require('fs');
const path = require('path');

// 解析JSDoc注释并生成Markdown格式文档
function generateMarkdown(注释文件路径, 输出文件路径) {
  const content = fs.readFileSync(注释文件路径, 'utf8');
  const markdownContent = parseJSDocToMarkdown(content);
  fs.writeFileSync(输出文件路径, markdownContent, 'utf8');
}

// 解析JSDoc注释并转换为Markdown格式
function parseJSDocToMarkdown(content) {
  const regex = //\*([^*]|\*+[^*]*)*\*\//g;
  let markdownContent = '# API文档

';
  let inFunction = false;
  let inParam = false;
  let functionTitle = '';
  let params = []; 
  let returns = ''; 

  content.split('
').forEach(line => {
    if (line.startsWith('function') || line.startsWith('class')) {
      inFunction = true;
      functionTitle = line.match(/function ([^\(]+)\(/)[1];
      params = [];
      returns = '';
    }

    if (inFunction && line.startsWith(' * @')) {
      if (line.startsWith(' * @param')) {
        inParam = true;
        const paramMatch = line.match(/@param {([^}]+)} ([^ ]+)/)[2];
        params.push({ name: paramMatch, type: line.match(/@param {([^}]+)} ([^ ]+)/)[1] });
      } else if (line.startsWith(' * @returns')) {
        inParam = false;
        const returnMatch = line.match(/@returns {([^}]+)} ([^ ]+)/)[1];
        returns = returnMatch;
      }
    }

    if (inFunction && !line.startsWith(' * @') && !line.startsWith('function') && !line.startsWith('class')) {
      if (inParam) {
        params.push({ name: line.trim(), type: '' });
      } else {
        markdownContent += `## ${functionTitle}

`;
      }
    }

    if (line.startsWith('}')) {
      inFunction = false;
      markdownContent += `**参数**:
${params.map(param => `- ${param.name} (${param.type})`).join('
')}

**返回值**: (${returns})


`;n
    }
  });

  return markdownContent;
}

// CLI接口
const args = process.argv.slice(2);
const inputFilePath = args.find(arg => arg.startsWith('-i'))?.slice(2);
const outputFilePath = args.find(arg => arg.startsWith('-o'))?.slice(2);

if (inputFilePath && outputFilePath) {
  generateMarkdown(inputFilePath, outputFilePath);
} else {
  console.log('请提供输入文件路径和输出文件路径。使用 -i 指定输入文件，-o 指定输出文件。');
}
