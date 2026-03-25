const fs = require('fs');
const path = require('path');
const { calculateCyclomaticComplexity, calculateCognitiveComplexity, calculateMaintainabilityIndex } = require('./utils');
const { analyze } = require('cognitive-complexity');

const analyzeCode = async (filePath) => {
  const code = fs.readFileSync(filePath, 'utf8');
  const ast = esprima.parse(code, {
    sourceType: 'module'
  });
  const cyclomaticComplexity = calculateCyclomaticComplexity(ast);
  const cognitiveComplexity = calculateCognitiveComplexity(code);
  const maintainabilityIndex = calculateMaintainabilityIndex(cyclomaticComplexity);
  const report = generateReport(cyclomaticComplexity, cognitiveComplexity, maintainabilityIndex);
  fs.writeFileSync(path.join(filePath, 'report.txt'), report);
};

const generateReport = (cyclomaticComplexity, cognitiveComplexity, maintainabilityIndex) => {
  let riskLevel = 'LOW';
  if (cyclomaticComplexity > 50) {
    riskLevel = 'HIGH';
  } else if (cyclomaticComplexity > 20) {
    riskLevel = 'MEDIUM';
  }

  return `Code Complexity Report
======================

Function: ${filePath}
- Cyclomatic Complexity: ${cyclomaticComplexity}
- Cognitive Complexity: ${cognitiveComplexity}
- Maintainability Index: ${maintainabilityIndex}
- Risk Level: ${riskLevel}

Overall: 1 function analyzed
1 ${riskLevel} risk`;}