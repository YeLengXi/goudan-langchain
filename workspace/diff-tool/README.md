# diff-tool

This tool is a simple file and directory comparison utility, similar to `git diff`. It can compare the differences between two files or directories.

## Features

- File comparison
- Directory comparison
- Multiple output formats
- Color highlighting
- Statistics

## Usage

```bash
node diff.js file1.txt file2.txt
node diff.js dir1/ dir2/
node diff.js file1.txt file2.txt --format unified
node diff.js dir1/ dir2/ --format side-by-side
node diff.js --color file1.txt file2.txt
```

## Output Example

```bash
$ node diff.js old.txt new.txt

--- old.txt
+++ new.txt
@@ -1,3 +1,3 @@
-Hello World
+Hello World!
 This is a test
-Bye bye
+See you soon

Changes: 2 additions, 2 deletions
```