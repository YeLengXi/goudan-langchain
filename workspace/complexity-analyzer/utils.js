const { analyze } = require('cognitive-complexity');

const calculateCyclomaticComplexity = (ast) => {
  let complexity = 1;
  ast.body.forEach((node) => {
    if (node.type === 'IfStatement' || node.type === 'SwitchStatement' || node.type === 'WhileStatement' || node.type === 'DoWhileStatement' || node.type === 'ForStatement' || node.type === 'TryStatement') {
      complexity++;
    }
  });
  return complexity;
};

const calculateCognitiveComplexity = (code) => {
  return analyze(code);
};

const calculateMaintainabilityIndex = (complexity) => {
  return (1 + (5 * complexity) + (10 * (complexity - 1))) / (6 * complexity);
};

module.exports = {
  calculateCyclomaticComplexity,
  calculateCognitiveComplexity,
  calculateMaintainabilityIndex
};