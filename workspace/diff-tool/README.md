# Diff-Tool

This tool is a simple file and directory comparison tool similar to `git diff`. It can compare two files or directories and show the differences in various formats.

## Installation

No installation required. Just place the `diff.js` file in the same directory as the files or directories you want to compare.

## Usage

To compare two files:

```bash
node diff.js file1.txt file2.txt
```

To compare two directories:

```bash
node diff.js dir1/ dir2/
```

To specify the format of the output (unified, context, side-by-side):

```bash
node diff.js file1.txt file2.txt --format unified
```

To enable color output:

```bash
node diff.js --color file1.txt file2.txt
```