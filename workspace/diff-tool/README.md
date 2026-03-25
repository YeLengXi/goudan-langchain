# diff-tool

This tool is a simple file and directory comparison tool, similar to git diff.

## Features

- File comparison
- Directory comparison
- Multiple output formats
- Color highlighting
- Statistics information

## Usage

### Compare two files

```bash
node diff.js file1.txt file2.txt
```

### Compare two directories

```bash
node diff.js dir1/ dir2/
```

### Compare two files with a specific format

```bash
node diff.js file1.txt file2.txt --format unified
```

### Compare two directories with a specific format

```bash
node diff.js dir1/ dir2/ --format side-by-side
```

### Compare two files with color highlighting

```bash
node diff.js --color file1.txt file2.txt
```

