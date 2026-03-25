const analyzeCodeComplexity = (code) => {
    const controlFlowKeywords = ['if', 'else', 'for', 'while', 'do-while', 'switch', 'case', 'catch', '三元运算符', '逻辑运算符(&&||)'];
    let complexity = 1;
    let cognitiveComplexity = 0;
    let maintainabilityIndex = 0;
    let functions = [];

    const extractFunctions = (code) => {
        const functionRegex = /function\s+([^(]*)\s*\(.*\)\s*\{([^}]*?)\}/g;
        let match;
        while ((match = functionRegex.exec(code)) !== null) {
            functions.push({ name: match[1], body: match[2] });
            code = code.replace(match[0], '').trim();
        }
    }

    const calculateComplexity = (code) => {
        const lines = code.split('
');
        lines.forEach(line => {
            if (controlFlowKeywords.some(keyword => line.includes(keyword))) {
                complexity++;
            }
            cognitiveComplexity += line.split(' ').length;
        });
    }

    extractFunctions(code);
    functions.forEach(func => {
        calculateComplexity(func.body);
        maintainabilityIndex += cognitiveComplexity;
    });

    return {
        functions,
        complexity,
        cognitiveComplexity,
        maintainabilityIndex
    };
};

module.exports = analyzeCodeComplexity;