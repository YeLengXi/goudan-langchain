const { analyzeDirectory } = require('./index.js');

const analyzeFile = (filePath, format, output) => {
  const code = fs.readFileSync(filePath, 'utf8');
  const { complexity, cognitiveComplexity, maintainabilityIndex } = analyzeCodeComplexity(code);

  if (format === 'json') {
    console.log(JSON.stringify({ file: filePath, complexity, cognitiveComplexity, maintainabilityIndex }, null, 2));
  } else if (output) {
    fs.writeFileSync(output, `${filePath}
${'='.repeat(40)}
Cyclomatic Complexity: ${complexity}
Cognitive Complexity: ${cognitiveComplexity}
Maintainability Index: ${maintainabilityIndex}
${'='.repeat(40)}

`, { flag: 'a' });
  } else {
    console.log(`File: ${filePath}
Cyclomatic Complexity: ${complexity}
Cognitive Complexity: ${cognitiveComplexity}
Maintainability Index: ${maintainabilityIndex}
`);
  }
};

module.exports = {
  analyzeFile
};