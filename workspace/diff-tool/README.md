# Diff Tool

This tool is a simple implementation of a file difference comparison tool, similar to `git diff`. It can compare the differences between two files or directories.

## Usage

To compare two files:

```bash
node diff.js <file1> <file2> [--format <format>] [--color]
```

To compare two directories:

```bash
node diff.js <dir1> <dir2> [--format <format>] [--color]
```

## Options

- `--format <format>`: Specify the output format. Supported formats are `unified`, `context`, and `side-by-side`. The default format is `unified`.
- `--color`: Enable color output.
