# Diff-Tool

This tool is a simple file and directory comparison tool, similar to `git diff`.

## Usage

To compare two files:

```bash
node diff.js file1.txt file2.txt
```

To compare two directories:

```bash
node diff.js dir1/ dir2/
```

To specify the output format:

```bash
node diff.js file1.txt file2.txt --format unified
```

To enable color output:

```bash
node diff.js --color file1.txt file2.txt
```

## Features

- File comparison
- Directory comparison
- Multiple output formats
- Color highlighting
- Statistics