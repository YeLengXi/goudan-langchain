# log-analyzer.cjs

const read_file = require('./log-parser');
const error_counter = require('./error-counter');
const search_engine = require('./search-engine');
const report_generator = require('./report-generator');

const args = process.argv.slice(2);
const filePath = args[0];
const options = args.slice(1);

read_file(filePath)
  .then((logData) => {
    const errors = error_counter(logData);
    const searchResults = search_engine(logData, options);
    const report = report_generator(errors, searchResults);
    console.log(report);
  })
  .catch((error) => {
    console.error(error);
  });