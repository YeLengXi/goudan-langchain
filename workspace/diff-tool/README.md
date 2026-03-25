// diff-tool

# diff-tool

This tool is a simple file and directory comparison tool, similar to git diff.

## Features

- File comparison
- Directory comparison
- Multiple output formats
- Color highlighting
- Statistics

## Usage

### File Comparison

To compare two files, run:

    node diff.js file1.txt file2.txt

### Directory Comparison

To compare two directories, run:

    node diff.js dir1/ dir2/

### Output Formats

- Unified diff (default)
- Context diff
- Side-by-side diff

To specify the output format, use the --format flag:

    node diff.js file1.txt file2.txt --format unified
    node diff.js dir1/ dir2/ --format side-by-side

### Color Highlighting

To enable color highlighting, use the --color flag:

    node diff.js --color file1.txt file2.txt

