const calculate = require('./file1');

// 用户界面函数
function displayResult() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;

    try {
        const result = calculate(operation, num1, num2);
        document.getElementById('result').innerText = `Result: ${result}`;
    } catch (error) {
        document.getElementById('result').innerText = `Error: ${error.message}`;
    }
}

// 为计算按钮添加事件监听器
document.getElementById('calculateBtn').addEventListener('click', displayResult);
