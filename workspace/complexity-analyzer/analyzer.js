// analyzer.js

const fs = require('fs');
const path = require('path');

const calculateCyclomaticComplexity = (ast) => {
  let complexity = 1;
  ast.body.forEach((node) => {
    if (node.type === 'IfStatement' || node.type === 'ForStatement' || node.type === 'WhileStatement' || node.type === 'DoWhileStatement' || node.type === 'SwitchStatement' || node.type === 'TryStatement') {
      complexity += 1;
    }
  });
  return complexity;
}

const calculateCognitiveComplexity = (code) => {
  const regex = /(?:if|else|for|while|do|switch|case|try|catch|throw|return|break|continue|new|this|super|function|class|module|export|import|const|let|var|async|await|=>|\+|\-|\*|\/|&&|\|\|\!|\=|\<|\>|\?|:|\,|\;|\{|\}|\[|\]|\()|\{|\}|\[|\]|\(|\)|\+|\-|\*|\/|&&|\|\|\!|\=|\<|\>|\?|:|\,|\;)/g;
  const matches = code.match(regex);
  return matches ? matches.length : 0;
}

const analyzeFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const ast = esprima.parseScript(content, {
    tolerant: true
  });

  const functions = ast.body.filter(node => node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression').map(node => ({
    name: node.id ? node.id.name : 'Anonymous',
    complexity: calculateCyclomaticComplexity(ast),
    cognitiveComplexity: calculateCognitiveComplexity(content),
    lines: content.split('
').length
  }));

  return functions;
}

const generateReport = (functions) => {
  let report = 'Code Complexity Report
======================

';
  functions.forEach(func => {
    report += `Function: ${func.name}
    - Cyclomatic Complexity: ${func.complexity}
    - Cognitive Complexity: ${func.cognitiveComplexity}
    - Risk Level: ${func.complexity >= 21 ? '❌ HIGH' : func.complexity >= 11 ? '⚠️ MEDIUM' : '✅ LOW'}
    - Lines: ${func.lines}

`;}
  report += `Overall: ${functions.length} functions analyzed
${functions.filter(func => func.complexity >= 21).length} HIGH risk, ${functions.filter(func => func.complexity >= 11 && func.complexity < 21).length} MEDIUM risk, ${functions.filter(func => func.complexity < 11).length} LOW risk
`;}
  return report;
}

const analyzeDirectory = (dirPath) => {
  const files = fs.readdirSync(dirPath);
  const results = files.map(file => analyzeFile(path.join(dirPath, file)));
  return results.flat();
}

module.exports = {
  analyzeFile,
  analyzeDirectory,
  generateReport
}