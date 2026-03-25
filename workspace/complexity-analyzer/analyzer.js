const fs = require('fs');
const path = require('path');
const esprima = require('esprima');
const complexity = require('complexity-score');

const analyzeFile = (filePath, outputFormat, outputPath) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const ast = esprima.parse(data, {
      sourceType: 'module'
    });

    const functions = ast.body.filter(node => node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression').map(node => {
      const functionAst = esprima.parse(node.body, {
        sourceType: 'module'
      });

      const complexityScore = complexity.getScore(functionAst);

      return {
        name: node.id ? node.id.name : 'Anonymous Function',
        cyclomaticComplexity: complexityScore.cyclomaticComplexity,
        cognitiveComplexity: complexityScore.cognitiveComplexity,
        maintainabilityIndex: complexityScore.maintainabilityIndex,
        lines: node.body.range[1] - node.body.range[0]
      };
    });

    const report = {
      functions: functions
    }

    if (outputFormat === 'json') {
      console.log(JSON.stringify(report, null, 2));
    } else if (outputPath) {
      fs.writeFile(outputPath, JSON.stringify(report, null, 2), (err) => {
        if (err) {
          console.error(err);
        }
      });
    } else {
      console.log(report);
    }
  });
}

const analyzeDirectory = (dirPath, outputFormat, outputPath) => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach(file => {
      if (path.extname(file) === '.js') {
        analyzeFile(path.join(dirPath, file), outputFormat, outputPath);
      }
    });
  });
}

module.exports = {
  analyzeFile,
  analyzeDirectory
}