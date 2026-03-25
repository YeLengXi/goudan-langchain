# generateCSV.js

const { Stringifier } = require('csv-stringify/sync');

module.exports = {
  generateCSV: (data, options) => {
    const stringifier = new Stringifier(options);
    let csvData = "";
    stringifier.write(data, (err, output) => {
      if (err) throw err;
      csvData = output;
    });
    stringifier.end(() => {
      return csvData;
    });
  }
}
