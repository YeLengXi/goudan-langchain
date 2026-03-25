const esprima = require('esprima');

function parseFunctions(content) {
  const ast = esprima.parse(content, {
    tolerant: true
  });
  return traverseAST(ast);
}

function traverseAST(node) {
  let functions = [];
  if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
    const functionName = node.id ? node.id.name : '匿名函数';
    const complexity = calculateCyclomaticComplexity(node);
    functions.push({ functionName, complexity });
  }
  node.body.forEach(child => functions = functions.concat(traverseAST(child)));
  return functions;
}

function calculateCyclomaticComplexity(node) {
  let complexity = 1;
  traverseAST(node, (node) => {
    if (node.type === 'IfStatement' || node.type === 'ForStatement' || node.type === 'WhileStatement' || node.type === 'DoWhileStatement' || node.type === 'SwitchStatement' || node.type === 'TryStatement') {
      complexity++;
    }
  });
  return complexity;
}

module.exports = {
  parseFunctions
};