# diff-tool

This tool is a simple file and directory comparison tool similar to git diff. It can compare two files or directories and show the differences.

## Features

- File comparison
- Directory comparison
- Multiple output formats (unified, context, side-by-side)
- Color highlighting
- Statistics information

## Usage

### File comparison

$ node diff.js file1.txt file2.txt

### Directory comparison

$ node diff.js dir1/ dir2/

### Output formats

$ node diff.js file1.txt file2.txt --format unified

$ node diff.js dir1/ dir2/ --format side-by-side

### Color highlighting

$ node diff.js --color file1.txt file2.txt

