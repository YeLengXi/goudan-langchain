const { program } = require('commander');

program
  .command('convert <input> --format <format>')
  .description('Convert CSV to JSON or Markdown/HTML table')
  .action((input, options) => {
    const csvTool = require('./csv-tool');
    const csvData = read_file(input);
    let result;
    if (options.format === 'json') {
      result = csvTool.csvToJson(csvData);
    } else if (options.format === 'markdown') {
      result = csvTool.csvToMarkdown(csvData);
    } else if (options.format === 'html') {
      result = csvTool.csvToHtml(csvData);
    }
    write_file(`output-${input}`, result);
  });

program
  .command('filter <input> --column <column> --value <value>')
  .description('Filter CSV by column and value')
  .action((input, options) => {
    const csvTool = require('./csv-tool');
    const csvData = read_file(input);
    const result = csvTool.filterCsv(csvData, options.column, options.value);
    write_file(`filtered-${input}`, result);
  });

program
  .command('sort <input> --column <column>')
  .description('Sort CSV by column')
  .action((input, options) => {
    const csvTool = require('./csv-tool');
    const csvData = read_file(input);
    const result = csvTool.sortCsv(csvData, options.column);
    write_file(`sorted-${input}`, result);
  });

program
  .command('to-table <input> --format <format>')
  .description('Convert CSV to Markdown or HTML table')
  .action((input, options) => {
    const csvTool = require('./csv-tool');
    const csvData = read_file(input);
    let result;
    if (options.format === 'markdown') {
      result = csvTool.csvToMarkdown(csvData);
    } else if (options.format === 'html') {
      result = csvTool.csvToHtml(csvData);
    }
    write_file(`table-${input}`, result);
  });

program.parse(process.argv);
