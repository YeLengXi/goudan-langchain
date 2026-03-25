const analyzeCodeComplexity = (filePath) => {
    const code = read_file(filePath).content;
    const functions = parseFunctions(code);
    const complexityReport = generateComplexityReport(functions);
    write_file({ "file_path": "workspace/complexity-analyzer/complexity-report.txt", "content": complexityReport });
};

const parseFunctions = (code) => {
    const functionRegex = /function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(.*\)\s*{[^}]*}/g;
    let match;
    const functions = [];
    while ((match = functionRegex.exec(code)) !== null) {
        const functionName = match[1];
        const functionBody = match[0];
        const controlFlowStatements = countControlFlowStatements(functionBody);
        functions.push({ functionName, controlFlowStatements });
    }
    return functions;
};

const countControlFlowStatements = (code) => {
    const controlFlowRegex = /(?:if|else|for|while|do-while|switch|case|catch|?:|&&|\|\|)/g;
    const statements = code.match(controlFlowRegex) || [];
    return statements.length;
};

const generateComplexityReport = (functions) => {
    let report = "Code Complexity Report\n======================\n";
    functions.forEach(functionInfo => {
        const complexity = functionInfo.controlFlowStatements + 1;
        const cognitiveComplexity = calculateCognitiveComplexity(functionInfo.functionName);
        const riskLevel = getRiskLevel(complexity);
        report += `Function: ${functionInfo.functionName}\n`;
        report += `- Cyclomatic Complexity: ${complexity}\n`; 
        report += `- Cognitive Complexity: ${cognitiveComplexity}\n`; 
        report += `- Risk Level: ${riskLevel}\n`; 
        report += `- Lines: ${functionInfo.functionName.length}\n\n`; 
    });
    report += `Overall: ${functions.length} functions analyzed\n${getHighRiskCount(functions)} HIGH risk, ${getLowRiskCount(functions)} LOW risk\n`; 
    return report;
};

const calculateCognitiveComplexity = (functionName) => {
    const complexityRegex = /([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g;
    const variables = functionName.match(complexityRegex) || [];
    return variables.length + 1;
};

const getRiskLevel = (complexity) => {
    if (complexity <= 10) return "✅ LOW";
    if (complexity <= 20) return "⚠️ MEDIUM";
    if (complexity <= 50) return "❌ HIGH";
    return "🚨 EXTREMELY HIGH";
};

const getHighRiskCount = (functions) => {
    return functions.filter(f => f.controlFlowStatements + 1 > 50).length;
};

const getLowRiskCount = (functions) => {
    return functions.filter(f => f.controlFlowStatements + 1 <= 10).length;
};
