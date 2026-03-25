# diff-tool

A simple file and directory comparison tool similar to git diff.

## Usage

### Compare files

```bash
node diff.js file1.txt file2.txt
```

### Compare directories

```bash
node diff.js dir1/ dir2/
```

### Compare files with format

```bash
node diff.js file1.txt file2.txt --format unified
```

### Compare directories with format

```bash
node diff.js dir1/ dir2/ --format side-by-side
```

### Compare files with color

```bash
node diff.js --color file1.txt file2.txt
```

