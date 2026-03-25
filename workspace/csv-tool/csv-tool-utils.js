module.exports = {
	readFile: require('fs').readFileSync,
	writeFile: require('fs').writeFileSync,
	execCommand: require('child_process').exec,
	listDirectory: require('fs').readdirSync
}