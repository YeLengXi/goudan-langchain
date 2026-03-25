// analyzer.js

const fs = require('fs');
const path = require('path');

const analyzeFunction = (code) => {
    const regex = /function\s+([^(]*)\s*\(.*\)\s*\{([^}]*\n[^}]*\n)*[^}]*\)/g;
    let functions = [];
    let match;

    while ((match = regex.exec(code)) !== null) {
        const functionName = match[1];
        const functionBody = match[2];
        const cyclomaticComplexity = calculateCyclomaticComplexity(functionBody);
        const cognitiveComplexity = calculateCognitiveComplexity(functionBody);
        const riskLevel = getRiskLevel(cyclomaticComplexity);

        functions.push({
            functionName,
            cyclomaticComplexity,
            cognitiveComplexity,
            riskLevel
        });
    }

    return functions;
};

const calculateCyclomaticComplexity = (code) => {
    let complexity = 1;
    const regex = /(?:if|else|for|while|do-while|switch|case|catch|\?\:|&&|\|\||\btrue\b|\bfalse\b)/g;
    let match;

    while ((match = regex.exec(code)) !== null) {
        complexity += 1;
    }

    return complexity;
};

const calculateCognitiveComplexity = (code) => {
    const regex = /(?:new|this|delete|throw|try|catch|finally|continue|break|return|switch|case|default|typeof|void|const|let|var|function|if|else|for|while|do-while|switch|case|catch|\?\:|&&|\|\||\btrue\b|\bfalse\b)/g;
    let complexity = 0;
    let match;

    while ((match = regex.exec(code)) !== null) {
        complexity += 1;
    }

    return complexity;
};

const getRiskLevel = (complexity) => {
    if (complexity <= 10) {
        return 'LOW';
    } else if (complexity <= 20) {
        return 'MEDIUM';
    } else if (complexity <= 50) {
        return 'HIGH';
    } else {
        return 'VERY_HIGH';
    }
};

const analyzeFile = (filePath) => {
    const code = fs.readFileSync(filePath, 'utf8');
    const functions = analyzeFunction(code);

    return functions;
};

const analyzeDirectory = (dirPath) => {
    const files = fs.readdirSync(dirPath);
    const results = files.map(file => analyzeFile(path.join(dirPath, file)));

    return results.flat();
};

module.exports = {
    analyzeFile,
    analyzeDirectory
}