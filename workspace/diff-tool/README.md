# Diff-Tool

This tool is a simple file and directory comparison tool, similar to git diff.

## Features

- File comparison
- Directory comparison
- Multiple output formats
- Color highlighting
- Statistics information

## Usage

### File Comparison

$ node diff.js file1.txt file2.txt

### Directory Comparison

$ node diff.js dir1/ dir2/

### Format

$ node diff.js file1.txt file2.txt --format unified

$ node diff.js dir1/ dir2/ --format side-by-side

### Color

$ node diff.js --color file1.txt file2.txt

## License

MIT