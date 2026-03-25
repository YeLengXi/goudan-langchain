const fs = require('fs');
const { program } = require('commander');

// Function to format JSON
function format(json, indent) {
    return JSON.stringify(json, null, indent);
}

// Function to sort JSON
function sort(json, key) {
    return JSON.sort(json, (a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
    });
}

// Function to filter JSON
function filter(json, condition) {
    return json.filter(item => {
        try {
            return eval(condition)(item);
        } catch (error) {
            console.error(error);
            return false;
        }
    });
}

// Function to merge JSON
function merge(json1, json2) {
    return JSON.stringify(JSON.concat(json1, json2), null, 2);
}

// Read JSON from file
function readJsonFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Write JSON to file
function writeJsonToFile(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(error);
    }
}

// Main function
function main() {
    program
        .command('format <filePath>')
        .description('Format JSON file')
        .action(filePath => {
            const json = readJsonFromFile(filePath);
            if (json) {
                writeJsonToFile(filePath, format(json, 2));
            } else {
                console.error('Invalid JSON file');
            }
        })
        .option('--indent <number>', 'Number of spaces for indentation', parseInt)
        .on('--help', () => {
            console.log(`
Usage: ${process.argv[0]} ${process.argv[1]} format <filePath> --indent <number>

  Options:
    --indent <number>  Number of spaces for indentation
`);
        })
        .command('sort <filePath>')
        .description('Sort JSON file by key')
        .action(filePath => {
            const json = readJsonFromFile(filePath);
            if (json) {
                writeJsonToFile(filePath, sort(json, program.args.key));
            } else {
                console.error('Invalid JSON file');
            }
        })
        .option('--key <key>', 'Key to sort by', String)
        .on('--help', () => {
            console.log(`
Usage: ${process.argv[0]} ${process.argv[1]} sort <filePath> --key <key>

  Options:
    --key <key>  Key to sort by
`);
        })
        .command('filter <filePath>')
        .description('Filter JSON file by condition')
        .action(filePath => {
            const json = readJsonFromFile(filePath);
            if (json) {
                writeJsonToFile(filePath, filter(json, program.args.condition));
            } else {
                console.error('Invalid JSON file');
            }
        })
        .option('--condition <condition>', 'Condition to filter by', String)
        .on('--help', () => {
            console.log(`
Usage: ${process.argv[0]} ${process.argv[1]} filter <filePath> --condition <condition>

  Options:
    --condition <condition>  Condition to filter by
`);
        })
        .parse(process.argv);
}

main();