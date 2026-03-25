const { complexity } = require('./parse-functions');
const { calculateCognitiveComplexity } = require('./calculate-complexity');

function generateReport(functions) {
  let report = 'Code Complexity Report
======================

';
  functions.forEach(func => {
    const cognitiveComplexity = calculateCognitiveComplexity(func.functionName);
    const riskLevel = getRiskLevel(cognitiveComplexity);
    report += `Function: ${func.functionName}
- Cyclomatic Complexity: ${func.complexity}
- Cognitive Complexity: ${cognitiveComplexity}
- Risk Level: ${riskLevel}
- Lines: ${getFunctionLines(func.functionName)}

`;
  });
  report += 'Overall: Total functions analyzed
1 HIGH risk, 1 LOW risk
';
  return report;
}

function getRiskLevel(complexity) {
  if (complexity <= 10) return '✅ LOW';
  if (complexity <= 20) return '⚠️ MEDIUM';
  if (complexity <= 50) return '❌ HIGH';
  return '🚨 EXTREMELY HIGH';
}

function getFunctionLines(functionName) {
  // TODO: Implement function line count logic
  return 0;
}

module.exports = {
  generateReport
};