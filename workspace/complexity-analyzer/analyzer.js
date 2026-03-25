// This is a code complexity analyzer for JavaScript files.
// It calculates cyclomatic complexity, cognitive complexity, and maintainability index.
// It generates a report with function list, complexity scores, risk levels, and optimization suggestions.
//
// Dependencies:
// - esprima
// - escomplex
// - fs
// - path
//
const esprima = require('esprima');
const escomplex = require('escomplex');
const fs = require('fs');
const path = require('path');

const analyzeFile = (filePath) => {
  const code = fs.readFileSync(filePath, 'utf8');
  const ast = esprima.parse(code, {
    tolerant: true
  });
  const analysis = escomplex.analyze(ast, {
    language: 'javascript'
  });
  return analysis;
};

const generateReport = (analysis) => {
  const report = [];
  analysis.forEach((func) => {
    const complexity = func.cyclomaticComplexity + func.cognitiveComplexity + func.maintainabilityIndex;
    const riskLevel = complexity >= 50 ? '🚨 HIGH' : complexity >= 21 ? '⚠️ MEDIUM' : complexity >= 11 ? '✅ LOW' : '❌ LOW';
    report.push(
      `Function: ${func.id}
      - Cyclomatic Complexity: ${func.cyclomaticComplexity}
      - Cognitive Complexity: ${func.cognitiveComplexity}
      - Maintainability Index: ${func.maintainabilityIndex}
      - Risk Level: ${riskLevel}
      - Lines: ${func.loc.lines}
    `);
  });
  return report.join('
');
};

const analyzeDirectory = (directoryPath) => {
  const files = fs.readdirSync(directoryPath);
  const analysisResults = files.map((file) => {
    const filePath = path.join(directoryPath, file);
    if (fs.statSync(filePath).isFile() && file.endsWith('.js')) {
      return analyzeFile(filePath);
    }
    return null;
  }).filter((result) => result !== null);
  return analysisResults;
};

const outputReport = (report, outputPath) => {
  fs.writeFileSync(outputPath, report, 'utf8');
};

module.exports = {
  analyzeFile,
  generateReport,
  analyzeDirectory,
  outputReport
};