# diff-tool

This tool is a simple file and directory comparison tool, similar to git diff.

## Features

- File comparison
- Directory comparison
- Multiple output formats
- Color highlighting
- Statistics

## Usage

### File comparison

```bash
node diff.js file1.txt file2.txt
```

### Directory comparison

```bash
node diff.js dir1/ dir2/
```

### Output formats

```bash
node diff.js file1.txt file2.txt --format unified
```

```bash
node diff.js dir1/ dir2/ --format side-by-side
```

### Color highlighting

```bash
node diff.js --color file1.txt file2.txt
```

