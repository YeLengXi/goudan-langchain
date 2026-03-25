# diff-tool

This tool is a simple file and directory comparison tool, similar to git diff.

## Features

- File comparison
- Directory comparison
- Multiple output formats
- Color highlighting
- Statistics information

## Usage

```bash
node diff.js file1.txt file2.txt
node diff.js dir1/ dir2/
node diff.js file1.txt file2.txt --format unified
node diff.js dir1/ dir2/ --format side-by-side
node diff.js --color file1.txt file2.txt
```