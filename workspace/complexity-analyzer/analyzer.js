const analyzeCodeComplexity = (code) => {
  const cyclomaticComplexity = (ast) => {
    let count = 1;
    ast.body.forEach((node) => {
      if (node.type === 'IfStatement' || node.type === 'ForStatement' || node.type === 'WhileStatement' || node.type === 'DoWhileStatement' || node.type === 'SwitchStatement' || node.type === 'TryStatement') {
        count++;
      }
    });
    return count;
  };

  const cognitiveComplexity = (code) => {
    const complexity = code.match(/(if|else|for|while|do|switch|case|catch|throw|try|finally|return|break|continue|new|this|super|delete|in|instanceof|typeof|void|delete|typeof|void|new|this|super|delete|in|instanceof|typeof|void|new|this|super|delete|in|instanceof|typeof|void)/g).length;
    return complexity;
  };

  const maintainabilityIndex = (lines) => {
    const complexity = cyclomaticComplexity(code);
    const cognitive = cognitiveComplexity(code);
    return (2 * cognitive) + (1 * complexity) - 1.5 * lines;
  };

  return {
    cyclomaticComplexity,
    cognitiveComplexity,
    maintainabilityIndex
  };
};
