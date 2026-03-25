module.exports = {
  readFileSync: require('fs').readFileSync,
  writeFileSync: require('fs').writeFileSync,
  execSync: require('child_process').execSync,
  listDirectory: require('fs').readdirSync,
}
