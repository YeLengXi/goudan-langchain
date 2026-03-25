const fs = require('fs');
const path = require('path');
const analyzeCodeComplexity = require('./analyzer.js');

const analyzeDirectory = (directoryPath, format, output) => {
  fs.readdir(directoryPath, { withFileTypes: true }, (err, dirents) => {
    if (err) {
      console.error(err);
      return;
    }

    const files = dirents.filter(dirent => dirent.isFile() && dirent.name.endsWith('.js')).map(dirent => dirent.name);
    files.forEach(file => {
      const filePath = path.join(directoryPath, file);
      const code = fs.readFileSync(filePath, 'utf8');
      const { complexity, cognitiveComplexity, maintainabilityIndex } = analyzeCodeComplexity(code);

      if (format === 'json') {
        console.log(JSON.stringify({ file, complexity, cognitiveComplexity, maintainabilityIndex }, null, 2));
      } else if (output) {
        fs.writeFileSync(output, `${file}
${'='.repeat(40)}
Cyclomatic Complexity: ${complexity}
Cognitive Complexity: ${cognitiveComplexity}
Maintainability Index: ${maintainabilityIndex}
${'='.repeat(40)}

`, { flag: 'a' });
      } else {
        console.log(`File: ${file}
Cyclomatic Complexity: ${complexity}
Cognitive Complexity: ${cognitiveComplexity}
Maintainability Index: ${maintainabilityIndex}
`);
      }
    });
  });
};

module.exports = {
  analyzeDirectory
};