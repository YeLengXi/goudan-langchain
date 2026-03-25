const Calculator = require('./file1.js');

function performOperation(operation, a, b) {
	switch (operation) {
		case 'add':
			return Calculator.add(a, b);
		case 'subtract':
			return Calculator.subtract(a, b);
		case 'multiply':
			return Calculator.multiply(a, b);
		case 'divide':
			return Calculator.divide(a, b);
		default:
			throw new Error('Invalid operation.');
	}
}

module.exports = performOperation;