const fs = require('fs');

// Function to format JSON
function format(json, indent) {
    try {
        return JSON.stringify(JSON.parse(json), null, indent);
    } catch (error) {
        throw new Error('Invalid JSON');
    }
}

// Function to sort JSON
function sort(json, key) {
    try {
        const data = JSON.parse(json);
        if (!Array.isArray(data)) {
            throw new Error('Input is not an array');
        }
        return data.sort((a, b) => {
            if (typeof a[key] === 'string' && typeof b[key] === 'string') {
                return a[key].localeCompare(b[key]);
            }
            return a[key] - b[key];
        });
    } catch (error) {
        throw new Error('Invalid JSON');
    }
}

// Function to filter JSON
function filter(json, condition) {
    try {
        const data = JSON.parse(json);
        if (!Array.isArray(data)) {
            throw new Error('Input is not an array');
        }
        return data.filter(item => eval(condition));
    } catch (error) {
        throw new Error('Invalid JSON');
    }
}

// Function to merge JSON
function merge(json1, json2) {
    try {
        return JSON.stringify(JSON.parse(json1), null, 4);
    } catch (error) {
        throw new Error('Invalid JSON');
    }
}

// Read file and process JSON
function processJSON(filePath, command, args) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        try {
            switch (command) {
                case 'format':
                    console.log(format(data, args.indent || 4));
                    break;
                case 'sort':
                    console.log(sort(data, args.key));
                    break;
                case 'filter':
                    console.log(filter(data, args.condition));
                    break;
                case 'merge':
                    console.log(merge(args.json1, args.json2));
                    break;
                default:
                    console.error('Unknown command');
            }
        } catch (error) {
            console.error(error.message);
        }
    });
}

// Parse command line arguments
const args = {
    command: process.argv[2],
    args: {}
};
process.argv.slice(3).forEach(arg => {
    const [key, value] = arg.split('=');
    args.args[key.slice(2)] = value;
});

// Execute the command
processJSON('input.json', args.command, args.args);