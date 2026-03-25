const analyzeCodeComplexity = (code) => {
  const controlFlowKeywords = ['if', 'else', 'for', 'while', 'do-while', 'switch', 'case', 'catch', '三元运算符', '逻辑运算符'];
  let complexity = 1;
  let cognitiveComplexity = 0;
  let maintainabilityIndex = 0;

  const lines = code.split('\n');
  lines.forEach(line => {
    const tokens = line.split(' ');
    tokens.forEach(token => {
      if (controlFlowKeywords.includes(token)) {
        complexity++;
      }
      if (token === 'if' || token === 'else' || token === 'for' || token === 'while' || token === 'do-while' || token === 'switch' || token === 'case' || token === 'catch') {
        cognitiveComplexity += tokens.length - 1;
      }
    });
  });

  maintainabilityIndex = 5 * (1 + complexity) - 10 * cognitiveComplexity;

  return {
    complexity,
    cognitiveComplexity,
    maintainabilityIndex
  };
};

module.exports = analyzeCodeComplexity;