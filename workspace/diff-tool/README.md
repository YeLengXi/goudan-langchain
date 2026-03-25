# Diff-Tool

This document provides instructions on how to use the Diff-Tool, a command-line utility for comparing files and directories.

## Installation

To use Diff-Tool, ensure you have Node.js installed on your system. You can download and install Node.js from [here](https://nodejs.org/).

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

Available formats:

- unified
- context
- side-by-side

To enable color output:

```bash
node diff.js --color file1.txt file2.txt
```

## Examples

Compare `old.txt` and `new.txt`:

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

Compare `dir1/` and `dir2/`:

```bash
$ node diff.js dir1/ dir2/
```
