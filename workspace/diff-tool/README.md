# diff-tool

This tool is a simple file and directory comparison tool similar to git diff.

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

You can specify the output format using the `--format` flag:

```bash
node diff.js file1.txt file2.txt --format unified
node diff.js dir1/ dir2/ --format side-by-side
```

### Color Output

To enable color output, use the `--color` flag:

```bash
node diff.js --color file1.txt file2.txt
```
