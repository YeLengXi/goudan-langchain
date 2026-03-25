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

```bash
node diff.js file1.txt file2.txt
```

### Directory Comparison

```bash
node diff.js dir1/ dir2/
```

### Output Formats

```bash
node diff.js file1.txt file2.txt --format unified
node diff.js dir1/ dir2/ --format side-by-side
```

### Color Highlighting

```bash
node diff.js --color file1.txt file2.txt
```

