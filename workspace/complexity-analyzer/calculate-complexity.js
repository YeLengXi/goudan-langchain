const esprima = require('esprima');

const calculateCyclomaticComplexity = (ast) => {
  let complexity = 1;
  ast.body.forEach(node => {
    if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
      complexity += countControlFlowStatements(node.body);
    }
  });
  return complexity;
};

const countControlFlowStatements = (node) => {
  let count = 0;
  switch (node.type) {
    case 'IfStatement':
    case 'SwitchStatement':
    case 'ForStatement':
    case 'WhileStatement':
    case 'DoWhileStatement':
    case 'TryStatement':
    case 'CatchClause':
      count += 1;
      if (node.alternate) {
        count += countControlFlowStatements(node.alternate);
      }
      if (node.consequent) {
        count += countControlFlowStatements(node.consequent);
      }
      break;
    case 'BinaryExpression':
    case 'LogicalExpression':
      count += node.operator === '&&' || node.operator === '||' ? 1 : 0;
      break;
    default:
      node.body.forEach(child => {
        count += countControlFlowStatements(child);
      });
  }
  return count;
};

module.exports = {
  calculateCyclomaticComplexity,
  countControlFlowStatements
};