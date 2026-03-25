# diff-tool

This tool is a simple file and directory difference comparison tool similar to git diff.

## Usage

### Compare two files

```bash
node diff.js file1.txt file2.txt
```

### Compare two directories

```bash
node diff.js dir1/ dir2/
```

### Compare two files with unified diff format

```bash
node diff.js file1.txt file2.txt --format unified
```

### Compare two directories with side-by-side diff format

```bash
node diff.js dir1/ dir2/ --format side-by-side
```

### Compare two files with color output

```bash
node diff.js --color file1.txt file2.txt
```

