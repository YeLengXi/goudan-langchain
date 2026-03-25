# diff-tool

This tool is a simple file and directory comparison tool similar to git diff.

## Features

- File comparison
- Directory comparison
- Multiple output formats
- Color highlighting
- Statistics

## Usage

### File Comparison

To compare two files:

```bash
node diff.js file1.txt file2.txt
```

### Directory Comparison

To compare two directories:

```bash
node diff.js dir1/ dir2/
```

### Output Formats

- Unified diff
- Context diff
- Side-by-side diff

To specify the output format:

```bash
node diff.js file1.txt file2.txt --format unified
```

### Color Highlighting

To enable color highlighting:

```bash
node diff.js --color file1.txt file2.txt
```

