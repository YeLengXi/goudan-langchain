# diff-tool

This tool is a simple file and directory comparison tool similar to git diff.

## Usage

### Compare files

$ node diff.js file1.txt file2.txt

### Compare directories

$ node diff.js dir1/ dir2/

### Compare files with format

$ node diff.js file1.txt file2.txt --format unified

### Compare directories with format

$ node diff.js dir1/ dir2/ --format side-by-side

### Compare files with color

$ node diff.js --color file1.txt file2.txt